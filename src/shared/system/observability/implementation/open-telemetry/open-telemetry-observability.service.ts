import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { metrics } from '@opentelemetry/api';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { HostMetrics } from '@opentelemetry/host-metrics';

import { SignozApplicationVariable } from '@shared/system/constant/application-variable/source/signoz.application-variable';
import { ObservabilityErrorLogInputModel } from '@shared/system/observability/model/input/observability-error-log.input.model';
import { ObservabilityLogInputModel } from '@shared/system/observability/model/input/observability-log.input.model';
import { ObservabilityGateway } from '@shared/system/observability/observability.gateway';

import type { LogAttributes } from '@opentelemetry/api-logs';

@Injectable()
export class OpenTelemetryObservabilityService
  extends ObservabilityGateway
  implements OnApplicationBootstrap
{
  protected readonly _type = OpenTelemetryObservabilityService.name;

  public onApplicationBootstrap(): void {
    if (!SignozApplicationVariable.SIGNOZ_ENABLED) {
      return;
    }

    this.registerNativeMetrics();
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

  private registerNativeMetrics(): void {
    const meterProvider = metrics.getMeterProvider();

    const hostMetrics = new HostMetrics({
      meterProvider,
      name: 'host-metrics',
    });

    hostMetrics.start();
  }
}
