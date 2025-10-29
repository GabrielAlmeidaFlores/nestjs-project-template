import { Injectable, StreamableFile } from '@nestjs/common';
import HtmlToDocx from '@turbodocx/html-to-docx';
import { marked } from 'marked';
import moment from 'moment';
import * as Puppeteer from 'puppeteer';
import TurndownService from 'turndown';

import { DownloadCnisFastAnalysisIsNotValidError } from '@module/customer/analysis-tool/error/download-cnis-fast-analysis-not-found.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { UnexpectedHtmlToDocxReturnTypeError } from '@module/customer/analysis-tool/lib/export-document/error/unexpected-html-to-docx-return-type.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';

@Injectable()
export class ExportDocumentService implements ExportDocumentGateway {
  protected readonly _type = ExportDocumentService.name;

  private readonly turndownService = new TurndownService();

  public convertHtmlToMarkdown(html: string): string {
    return this.turndownService.turndown(html);
  }

  public async convertMarkdownToHtml(markdown: string): Promise<string> {
    return await marked.parse(markdown, {
      breaks: true,
      gfm: true,
    });
  }

  public getUnifiedStyles(): string {
    return `
      body {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
        margin: 40px 60px;
        font-size: 12pt;
        color: #111;
      }
      h1 { font-size: 24pt; margin-bottom: 10px; color: #222; }
      h2 { font-size: 20pt; margin-bottom: 8px; color: #333; }
      h3 { font-size: 16pt; margin-bottom: 6px; color: #444; }
      p { margin: 8px 0; }
      strong { font-weight: bold; }
      em { font-style: italic; }
      a { color: #1a73e8; text-decoration: underline; }
      ul, ol { margin-left: 20px; margin-bottom: 10px; }
      pre { background: #f5f5f5; padding: 10px; overflow-x: auto; border-radius: 4px; }
      code { font-family: monospace; background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        page-break-inside: auto;
      }
      th, td {
        border: 1px solid #999;
        padding: 6px 8px;
        text-align: left;
        vertical-align: top;
      }
      th { background-color: #eee; }
      tr { page-break-inside: avoid; page-break-after: auto; }
    `;
  }

  public async downloadFile(
    markdownContent: string,
    format: string,
  ): Promise<Buffer> {
    const htmlContent = await this.convertMarkdownToHtml(markdownContent);

    switch (format.toLowerCase()) {
      case 'pdf':
        return this.generatePdfFromHtml(htmlContent);
      case 'docx':
        return this.generateDocxFromHtml(htmlContent);
      default:
        throw new DownloadCnisFastAnalysisIsNotValidError();
    }
  }

  public async downloadFileAsStreamable(
    content: string,
    format: ExportDocumentFormatEnum,
    name: string,
  ): Promise<StreamableFile> {
    const fileBuffer = await this.downloadFile(content, format);

    const formatted = moment().format('DD-MM-YYYY');

    const filename = `${name}_${formatted}.${format.toLowerCase()}`;
    const contentType =
      format === ExportDocumentFormatEnum.PDF
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    return new StreamableFile(fileBuffer, {
      type: contentType,
      disposition: `attachment; filename="${filename}"`,
    });
  }

  private _buildFullHtmlDocument(htmlBody: string): string {
    return `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>${this.getUnifiedStyles()}</style>
        </head>
        <body>${htmlBody}</body>
      </html>
    `;
  }

  private async generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
    const fullHtml = this._buildFullHtmlDocument(htmlContent);
    const browser = await Puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(fullHtml);

    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '20mm', left: '5mm', right: '10mm' },
    });
    await browser.close();

    return Buffer.from(pdfUint8Array);
  }

  private async generateDocxFromHtml(htmlContent: string): Promise<Buffer> {
    const fullHtmlDocument = this._buildFullHtmlDocument(htmlContent);

    const docxResult = await HtmlToDocx(fullHtmlDocument, null, {
      orientation: 'portrait',
      table: { row: { cantSplit: true } },
      footer: false,
      pageNumber: false,
    });

    let buffer: Buffer;
    if (docxResult instanceof ArrayBuffer) {
      buffer = Buffer.from(docxResult);
    } else if (Buffer.isBuffer(docxResult)) {
      buffer = docxResult;
    } else if (docxResult instanceof Blob) {
      const arrayBuffer = await docxResult.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      throw new UnexpectedHtmlToDocxReturnTypeError();
    }
    return buffer;
  }
}
