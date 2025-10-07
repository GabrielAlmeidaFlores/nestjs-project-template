import { Module } from '@nestjs/common';

import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { AnalysisProcessorService } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.service';

@Module({
  imports: [GenerativeIaModule, CnisProcessorModule],
  providers: [
    {
      useClass: AnalysisProcessorService,
      provide: AnalysisProcessorGateway,
    },
  ],
  exports: [AnalysisProcessorGateway],
})
export class AnalysisProcessorModule {
  protected readonly _type = AnalysisProcessorModule.name;
}
