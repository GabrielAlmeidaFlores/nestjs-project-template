import { hostname } from 'os';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

import { SignozApplicationVariable } from '@shared/system/constant/application-variable/source/signoz.application-variable';
import { SpanNameEnricherProcessor } from '@shared/system/tracing/span-name-enricher.processor';

const METRICS_EXPORT_INTERVAL_MS = 15_000;

function buildAuthHeaders(): Record<string, string> {
  const token = SignozApplicationVariable.SIGNOZ_ACCESS_TOKEN;

  if (token.length === 0) {
    return {};
  }

  return { 'signoz-access-token': token };
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
    'service.instance.id': SignozApplicationVariable.SIGNOZ_SERVICE_NAME,
  });

  const traceExporter = new OTLPTraceExporter({
    url: `${endpoint}/v1/traces`,
    headers,
  });

  const logExporter = new OTLPLogExporter({
    url: `${endpoint}/v1/logs`,
    headers,
  });

  const metricExporter = new OTLPMetricExporter({
    url: `${endpoint}/v1/metrics`,
    headers,
  });

  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: METRICS_EXPORT_INTERVAL_MS,
  });

  return new NodeSDK({
    resource,
    metricReader,
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
