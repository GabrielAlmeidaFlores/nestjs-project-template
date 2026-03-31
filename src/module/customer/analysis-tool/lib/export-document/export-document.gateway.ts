import type { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import type { ExportDocumentDownloadOptionsInterface } from '@module/customer/analysis-tool/lib/export-document/export-document-download-options.interface';
import type { StreamableFile } from '@nestjs/common';

export abstract class ExportDocumentGateway {
  public abstract convertHtmlToMarkdown(html: string): string;

  public abstract convertMarkdownToHtml(markdown: string): Promise<string>;

  public abstract downloadFile(
    content: string,
    format: ExportDocumentFormatEnum,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<Buffer>;

  public abstract downloadFileAsStreamable(
    content: string,
    format: ExportDocumentFormatEnum,
    name: string,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<StreamableFile>;
}
