import { Module } from '@nestjs/common';

import { CnisAnalysisService } from '@lib/cnis-analysis/cnis-analysis.service';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { CnisAnalysisGateway } from '@lib/cnis-analysis/cnis-analysis-gateway';

@Module({
  imports: [CnisProcessorModule],
  providers: [
    CnisAnalysisService,
    {
      useClass: CnisAnalysisService,
      provide: CnisAnalysisGateway,
    },
  ],
  exports: [CnisAnalysisGateway, CnisAnalysisService],
})
export class CnisAnalysisModule {
  protected readonly _type = CnisAnalysisModule.name;
}
