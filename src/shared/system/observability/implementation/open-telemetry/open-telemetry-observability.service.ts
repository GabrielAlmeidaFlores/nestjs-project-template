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
  private static readonly CPU_MICROSECONDS_TO_PERCENT_DIVISOR = 10;
  private static readonly CPU_PERCENT_MAX = 100;

  protected readonly _type = OpenTelemetryObservabilityService.name;

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
    const prefix = serviceName.replace(/-/g, '_');

    let previousCpuUsage = process.cpuUsage();
    let previousTime = Date.now();

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
            (elapsedMs *
              OpenTelemetryObservabilityService.CPU_MICROSECONDS_TO_PERCENT_DIVISOR);

          result.observe(
            Math.min(
              OpenTelemetryObservabilityService.CPU_PERCENT_MAX,
              Math.max(0, userPercent),
            ),
          );
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
            (elapsedMs *
              OpenTelemetryObservabilityService.CPU_MICROSECONDS_TO_PERCENT_DIVISOR);

          result.observe(
            Math.min(
              OpenTelemetryObservabilityService.CPU_PERCENT_MAX,
              Math.max(0, systemPercent),
            ),
          );
        }
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.heap_used_mb`, {
        description: 'Process heap memory currently used',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        const mem = process.memoryUsage();
        result.observe(
          mem.heapUsed / OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.heap_total_mb`, {
        description: 'Process total heap memory allocated',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        const mem = process.memoryUsage();
        result.observe(
          mem.heapTotal / OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.rss_mb`, {
        description: 'Process Resident Set Size (total memory allocated)',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        const mem = process.memoryUsage();
        result.observe(mem.rss / OpenTelemetryObservabilityService.BYTES_TO_MB);
      });

    meter
      .createObservableGauge(`${prefix}.process.memory.external_mb`, {
        description: 'Memory used by C++ objects bound to JavaScript objects',
        unit: 'MB',
      })
      .addCallback((result: ObservableResult) => {
        const mem = process.memoryUsage();
        result.observe(
          mem.external / OpenTelemetryObservabilityService.BYTES_TO_MB,
        );
      });

    const hostMetrics = new HostMetrics({ meterProvider });
    hostMetrics.start();
  }
}
