import { ExportDocumentGateway } from "@module/customer/analysis-tool/lib/export-document/export-document.gateway";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  providers: [
    {
      useClass: ,
      provide: ExportDocumentGateway
    }
  ],
  exports: [ExportDocumentGateway],
})
export class ExportDocumentModule {
  protected readonly _type = ExportDocumentModule.name;
}
