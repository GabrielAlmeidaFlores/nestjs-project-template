import { Module } from '@nestjs/common';

import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisIaAnalysisGateway } from '@module/customer/cnis-fast-analysis/lib/cnis-ia-analysis/cnis-ia-analysis.gateway';
import { CnisIaAnalysisService } from '@module/customer/cnis-fast-analysis/lib/cnis-ia-analysis/cnis-ia-analysis.service';

@Module({
  imports: [GenerativeIaModule],
  providers: [
    {
      useClass: CnisIaAnalysisService,
      provide: CnisIaAnalysisGateway,
    },
  ],
  exports: [CnisIaAnalysisGateway],
})
export class CnisIaAnalysisModule {
  protected readonly _type = CnisIaAnalysisModule.name;
}
