import { Module } from '@nestjs/common';

import { CnisAnalysisGateway } from '@lib/cnis-analysis/cnis-analysis-gateway';
import { CnisAnalysisService } from '@lib/cnis-analysis/cnis-analysis.service';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';

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
