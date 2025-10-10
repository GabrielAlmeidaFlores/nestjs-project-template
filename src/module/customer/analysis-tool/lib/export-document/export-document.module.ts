import { Module } from '@nestjs/common';

import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { ExportDocumentService } from '@module/customer/analysis-tool/lib/export-document/export-document.service';

@Module({
  imports: [],
  providers: [
    {
      useClass: ExportDocumentService,
      provide: ExportDocumentGateway,
    },
  ],
  exports: [ExportDocumentGateway],
})
export class ExportDocumentModule {
  protected readonly _type = ExportDocumentModule.name;
}
