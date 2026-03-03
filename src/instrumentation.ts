import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { metrics } from '@opentelemetry/api';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { hostname } from 'os';
import { SpanNameEnricherProcessor } from '@shared/system/tracing/span-name-enricher.processor';
import { SignozApplicationVariable } from '@shared/system/constant/application-variable/source/signoz.application-variable';

import type { Resource } from '@opentelemetry/resources';
import type { ObservableResult } from '@opentelemetry/api';

const METRICS_EXPORT_INTERVAL_MS = 15_000;
const BYTES_TO_MB = 1_048_576;

function buildAuthHeaders(): Record<string, string> {
  const token = SignozApplicationVariable.SIGNOZ_ACCESS_TOKEN;

  if (token.length === 0) {
    return {};
  }

  return { 'signoz-access-token': token };
}

function registerProcessMetrics(resource: Resource): MeterProvider {
  const headers = buildAuthHeaders();
  const endpoint = SignozApplicationVariable.SIGNOZ_ENDPOINT;

  const metricExporter = new OTLPMetricExporter({
    url: `${endpoint}/v1/metrics`,
    headers,
  });

  const meterProvider = new MeterProvider({
    resource,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: METRICS_EXPORT_INTERVAL_MS,
      }),
    ],
  });

  metrics.setGlobalMeterProvider(meterProvider);

  const meter = meterProvider.getMeter('process-metrics');

  let previousCpuUsage = process.cpuUsage();
  let previousTime = Date.now();

  const serviceName = SignozApplicationVariable.SIGNOZ_SERVICE_NAME;
  const prefix = serviceName.replace(/-/g, '_');

  meter
    .createObservableGauge(`${prefix}.process.cpu.user_percent`, {
      description: 'Process CPU user time as a percentage of wall-clock time',
      unit: '%',
    })
    .addCallback((result: ObservableResult) => {
      const currentCpuUsage = process.cpuUsage();
      const currentTime = Date.now();
      const elapsedMs = currentTime - previousTime;

      if (elapsedMs > 0) {
        const userPercent =
          (currentCpuUsage.user - previousCpuUsage.user) /
          (elapsedMs * 10);

        result.observe(Math.min(100, Math.max(0, userPercent)));
      }

      previousCpuUsage = currentCpuUsage;
      previousTime = currentTime;
    });

  meter
    .createObservableGauge(`${prefix}.process.cpu.system_percent`, {
      description:
        'Process CPU system time as a percentage of wall-clock time',
      unit: '%',
    })
    .addCallback((result: ObservableResult) => {
      const currentCpuUsage = process.cpuUsage();
      const currentTime = Date.now();
      const elapsedMs = currentTime - previousTime;

      if (elapsedMs > 0) {
        const systemPercent =
          (currentCpuUsage.system - previousCpuUsage.system) /
          (elapsedMs * 10);

        result.observe(Math.min(100, Math.max(0, systemPercent)));
      }
    });

  meter
    .createObservableGauge(`${prefix}.process.memory.heap_used_mb`, {
      description: 'Process heap memory currently used',
      unit: 'MB',
    })
    .addCallback((result: ObservableResult) => {
      const mem = process.memoryUsage();
      result.observe(mem.heapUsed / BYTES_TO_MB);
    });

  meter
    .createObservableGauge(`${prefix}.process.memory.heap_total_mb`, {
      description: 'Process total heap memory allocated',
      unit: 'MB',
    })
    .addCallback((result: ObservableResult) => {
      const mem = process.memoryUsage();
      result.observe(mem.heapTotal / BYTES_TO_MB);
    });

  meter
    .createObservableGauge(`${prefix}.process.memory.rss_mb`, {
      description: 'Process Resident Set Size (total memory allocated)',
      unit: 'MB',
    })
    .addCallback((result: ObservableResult) => {
      const mem = process.memoryUsage();
      result.observe(mem.rss / BYTES_TO_MB);
    });

  meter
    .createObservableGauge(`${prefix}.process.memory.external_mb`, {
      description: 'Memory used by C++ objects bound to JavaScript objects',
      unit: 'MB',
    })
    .addCallback((result: ObservableResult) => {
      const mem = process.memoryUsage();
      result.observe(mem.external / BYTES_TO_MB);
    });

  const hostMetrics = new HostMetrics({ meterProvider });
  hostMetrics.start();

  return meterProvider;
}

function buildInstrumentation(): NodeSDK | null {
  if (!SignozApplicationVariable.SIGNOZ_ENABLED) {
    return null;
  }

  const endpoint = SignozApplicationVariable.SIGNOZ_ENDPOINT;
  const headers = buildAuthHeaders();

  const resource = resourceFromAttributes({
    [SEMRESATTRS_SERVICE_NAME]: SignozApplicationVariable.SIGNOZ_SERVICE_NAME,
    'host.name': hostname(),
    'service.instance.id': `${SignozApplicationVariable.SIGNOZ_SERVICE_NAME}@${hostname()}`,
  });

  const traceExporter = new OTLPTraceExporter({
    url: `${endpoint}/v1/traces`,
    headers,
  });

  const logExporter = new OTLPLogExporter({
    url: `${endpoint}/v1/logs`,
    headers,
  });

  registerProcessMetrics(resource);

  return new NodeSDK({
    resource,
    spanProcessors: [
      new SpanNameEnricherProcessor(new BatchSpanProcessor(traceExporter)),
    ],
    logRecordProcessors: [new BatchLogRecordProcessor(logExporter)],
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });
}

const sdk = buildInstrumentation();

if (sdk !== null) {
  sdk.start();

  process.on('SIGTERM', () => {
    void sdk.shutdown();
  });
}
