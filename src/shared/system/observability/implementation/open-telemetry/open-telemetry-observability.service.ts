import { cpus, freemem, totalmem } from 'os';

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { metrics } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { HostMetrics } from '@opentelemetry/host-metrics';

import { SignozApplicationVariable } from '@shared/system/constant/application-variable/source/signoz.application-variable';
import { ObservabilityErrorLogInputModel } from '@shared/system/observability/model/input/observability-error-log.input.model';
import { ObservabilityLogInputModel } from '@shared/system/observability/model/input/observability-log.input.model';
import { ObservabilityGateway } from '@shared/system/observability/observability.gateway';

import type { ObservableResult } from '@opentelemetry/api';
import type { LogAttributes } from '@opentelemetry/api-logs';

@Injectable()
export class OpenTelemetryObservabilityService
  extends ObservabilityGateway
  implements OnApplicationBootstrap
{
  private static readonly BYTES_TO_MB = 1_048_576;
  private static readonly PERCENT = 100;

  protected readonly _type = OpenTelemetryObservabilityService.name;

  private previousCpuSnapshot = cpus();

  public onApplicationBootstrap(): void {
    if (!SignozApplicationVariable.SIGNOZ_ENABLED) {
      return;
    }

    this.registerProcessMetrics();
  }

  public emitInfo(params: ObservabilityLogInputModel): void {
    if (!SignozApplicationVariable.SIGNOZ_ENABLED) {
      return;
    }

    const logger = logs.getLogger(params.scope);

    logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: 'INFO',
      body: params.message,
      attributes: params.attributes as LogAttributes,
    });
  }

  public emitError(params: ObservabilityErrorLogInputModel): void {
    if (!SignozApplicationVariable.SIGNOZ_ENABLED) {
      return;
    }

    const logger = logs.getLogger(params.scope);
    const attributes: Record<string, unknown> = { ...params.attributes };

    if (params.error !== undefined) {
      attributes['exception.message'] = params.error.message;
      attributes['exception.stacktrace'] = params.error.stack ?? '';
    }

    logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: 'ERROR',
      body: params.message,
      attributes: attributes as LogAttributes,
    });
  }

  private registerProcessMetrics(): void {
    const meterProvider = metrics.getMeterProvider();
    const meter = meterProvider.getMeter('process-metrics');

    const serviceName = SignozApplicationVariable.SIGNOZ_SERVICE_NAME;
    const prefix = serviceName
      .replace(/-/g, '_')
      .replace(/@/g, '_')
      .replace(/\./g, '_');

    const cpuUsageGauge = meter.createObservableGauge(
      `${prefix}.process.cpu.used_percent`,
      {
        description: 'System CPU usage as % across all cores (same as htop)',
        unit: '%',
      },
    );

    cpuUsageGauge.addCallback((result: ObservableResult) => {
      const currentSnapshot = cpus();
      let totalUsagePercent = 0;

      for (let i = 0; i < currentSnapshot.length; i++) {
        const prev = this.previousCpuSnapshot[i]?.times;
        const curr = currentSnapshot[i]?.times;

        if (!prev || !curr) continue;

        const prevTotal = Object.values(prev).reduce((a, b) => a + b, 0);
        const currTotal = Object.values(curr).reduce((a, b) => a + b, 0);

        const diffIdle = curr.idle - prev.idle;
        const diffTotal = currTotal - prevTotal;

        if (diffTotal > 0) {
          const coreUsage =
            (1 - diffIdle / diffTotal) *
            OpenTelemetryObservabilityService.PERCENT;
          totalUsagePercent += coreUsage;
        }
      }

      const avgUsage = totalUsagePercent / currentSnapshot.length;

      this.previousCpuSnapshot = currentSnapshot;

      result.observe(Math.min(100, Math.max(0, avgUsage)));
    });

    meter
      .createObservableGauge(`${prefix}.process.memory.heap_used_mb`, {
        description: 'Process heap memory currently used',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        result.observe(
          process.memoryUsage().heapUsed /
            OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.heap_total_mb`, {
        description: 'Process total heap memory allocated',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        result.observe(
          process.memoryUsage().heapTotal /
            OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.rss_mb`, {
        description: 'Process Resident Set Size (total memory allocated)',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        result.observe(
          process.memoryUsage().rss /
            OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.system_used_percent`, {
        description: 'System RAM used as a percentage of total',
        unit: '%',
      })
      .addCallback((result: ObservableResult) => {
        const total = totalmem();
        const used = total - freemem();
        result.observe(
          (used / total) * OpenTelemetryObservabilityService.PERCENT,
        );
      });

    const hostMetrics = new HostMetrics({ meterProvider });
    hostMetrics.start();
  }
}
