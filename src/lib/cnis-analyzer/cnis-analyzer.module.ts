import { Module } from '@nestjs/common';

import { CnisAnalyzerGateway } from '@lib/cnis-analyzer/cnis-analyzer-gateway';
import { CnisAnalyzerService } from '@lib/cnis-analyzer/cnis-analyzer.service';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';

@Module({
  imports: [CnisProcessorModule],
  providers: [
    CnisAnalyzerService,
    {
      useClass: CnisAnalyzerService,
      provide: CnisAnalyzerGateway,
    },
  ],
  exports: [CnisAnalyzerGateway, CnisAnalyzerService],
})
export class CnisAnalyzerModule {
  protected readonly _type = CnisAnalyzerModule.name;
}
