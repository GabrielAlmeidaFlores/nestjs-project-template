import { Module } from '@nestjs/common';

import { CnisXRayAnalysisGateway } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.gateway';
import { CnisXRayAnalysisService } from '@module/customer/analysis-tool/lib/cnis-x-ray-analysis/cnis-x-ray-analysis.service';

@Module({
  providers: [
    {
      provide: CnisXRayAnalysisGateway,
      useClass: CnisXRayAnalysisService,
    },
  ],
  exports: [CnisXRayAnalysisGateway],
})
export class CnisXRayAnalysisModule {
  protected readonly _type = CnisXRayAnalysisModule.name;
}
