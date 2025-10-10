import type { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/enum/export-document-type.enum';
import type { StreamableFile } from '@nestjs/common';

export abstract class ExportDocumentGateway {
  public abstract downloadFile(
    content: string,
    format: ExportDocumentFormatEnum,
  ): Promise<Buffer>;

  public abstract downloadFileAsStreamable(
    content: string,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile>;
}
