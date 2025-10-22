import { Module } from '@nestjs/common';

import { CnisAnalysisService } from '@lib/cnis-analysis/cnis-analysis.service';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';

@Module({
  imports: [CnisProcessorModule],
  providers: [CnisAnalysisService],
  exports: [CnisAnalysisService],
})
export class CnisAnalysisModule {
  protected readonly _type = CnisAnalysisModule.name;
}
