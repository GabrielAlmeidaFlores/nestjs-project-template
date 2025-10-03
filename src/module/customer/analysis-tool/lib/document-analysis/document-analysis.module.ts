import { Module } from '@nestjs/common';

import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { DocumentAnalysisGateway } from '@module/customer/analysis-tool/lib/document-analysis/document-analysis.gateway';
import { DocumentAnalysisService } from '@module/customer/analysis-tool/lib/document-analysis/document-analysis.service';

@Module({
  imports: [GenerativeIaModule],
  providers: [
    {
      useClass: DocumentAnalysisService,
      provide: DocumentAnalysisGateway,
    },
  ],
  exports: [DocumentAnalysisGateway],
})
export class DocumentAnalysisModule {
  protected readonly _type = DocumentAnalysisModule.name;
}
