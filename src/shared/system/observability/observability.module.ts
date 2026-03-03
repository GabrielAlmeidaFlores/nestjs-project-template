import { Module } from '@nestjs/common';

import { OpenTelemetryObservabilityService } from '@shared/system/observability/implementation/open-telemetry/open-telemetry-observability.service';
import { ObservabilityGateway } from '@shared/system/observability/observability.gateway';

@Module({
  providers: [
    {
      provide: ObservabilityGateway,
      useClass: OpenTelemetryObservabilityService,
    },
  ],
  exports: [ObservabilityGateway],
})
export class ObservabilityModule {
  protected readonly _type = ObservabilityModule.name;
}
