import { Module } from '@nestjs/common';

import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisAnalysisGateway } from '@module/customer/cnis-fast-analysis/lib/cnis-analysis/cnis-analysis.gateway';
import { CnisAnalysisService } from '@module/customer/cnis-fast-analysis/lib/cnis-analysis/cnis-analysis.service';

@Module({
  imports: [GenerativeIaModule],
  providers: [
    {
      useClass: CnisAnalysisService,
      provide: CnisAnalysisGateway,
    },
  ],
  exports: [CnisAnalysisGateway],
})
export class CnisAnalysisModule {
  protected readonly _type = CnisAnalysisModule.name;
}
