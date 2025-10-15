import { Injectable, StreamableFile } from '@nestjs/common';
import HtmlToDocx from '@turbodocx/html-to-docx';
import { marked } from 'marked';
import * as Puppeteer from 'puppeteer';

import { DownloadCnisFastAnalysisIsNotValidError } from '@module/customer/analysis-tool/error/download-cnis-fast-analysis-not-found.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/enum/export-document-type.enum';
import { UnexpectedHtmlToDocxReturnTypeError } from '@module/customer/analysis-tool/lib/export-document/error/unexpected-html-to-docx-return-type.error';

@Injectable()
export class ExportDocumentService {
  protected readonly _type = ExportDocumentService.name;

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

  public async downloadFile(content: string, format: string): Promise<Buffer> {
    const markdown = await marked.parse(content, {
      breaks: true,
      gfm: true,
    });

    switch (format.toLowerCase()) {
      case 'pdf':
        return this.generatedPdfForMarkdown(markdown);
      case 'docx':
        return this.generatedDocxForMarkdown(markdown);
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

    const filename = `${name}.${format.toLowerCase()}`;
    const contentType =
      format === ExportDocumentFormatEnum.PDF
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    return new StreamableFile(fileBuffer, {
      type: contentType,
      disposition: `attachment; filename="${filename}"`,
    });
  }

  private async generatedPdfForMarkdown(markdown: string): Promise<Buffer> {
    const browser = await Puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(`
     <html>
        <head>
          <style>${this.getUnifiedStyles()}</style>
        </head>
        <body>${markdown}</body>
      </html>
    `);

    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '20mm', left: '5mm', right: '10mm' },
    });
    await browser.close();

    return Buffer.from(pdfUint8Array);
  }

  private async generatedDocxForMarkdown(markdown: string): Promise<Buffer> {
    const fullHtmlDocument = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>${this.getUnifiedStyles()}</style>
        </head>
        <body>${markdown}</body>
      </html>
    `;

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
