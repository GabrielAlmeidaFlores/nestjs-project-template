import { Injectable, StreamableFile } from '@nestjs/common';
import HtmlToDocx from '@turbodocx/html-to-docx';
import moment from 'moment';
import * as Puppeteer from 'puppeteer';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import TurndownService from 'turndown';
import { unified } from 'unified';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { UnexpectedHtmlToDocxReturnTypeError } from '@module/customer/analysis-tool/lib/export-document/error/unexpected-html-to-docx-return-type.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';

import type { ExportDocumentDownloadOptionsInterface } from '@module/customer/analysis-tool/lib/export-document/export-document-download-options.interface';

function escapeTableCell(text: string): string {
  return text
    .trim()
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ');
}

function addTableRule(service: TurndownService): void {
  service.addRule('cnisTable', {
    filter: (node) => node.nodeName === 'TABLE',

    replacement: (_content, node) => {
      const table = node as HTMLTableElement;
      const rows: string[][] = [];
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      const trs: HTMLTableRowElement[] = [];
      if (thead) {
        trs.push(...Array.from(thead.querySelectorAll('tr')));
      }
      if (tbody) {
        trs.push(...Array.from(tbody.querySelectorAll('tr')));
      }

      for (const tr of trs) {
        const cells = tr.querySelectorAll('th, td');
        const row = Array.from(cells).map((cell) =>
          escapeTableCell((cell as HTMLElement).innerText || ''),
        );
        if (row.length > 0) {
          rows.push(row);
        }
      }

      if (rows.length === 0) {
        return '';
      }

      const columnCount = Math.max(...rows.map((r) => r.length));
      const pad = (r: string[]): string[] => [
        ...r,
        ...(Array(columnCount - r.length).fill('') as string[]),
      ];
      const header = '| ' + pad(rows[0] ?? []).join(' | ') + ' |';
      const sep = '| ' + Array(columnCount).fill('---').join(' | ') + ' |';
      const body = rows
        .slice(1)
        .map((r) => '| ' + pad(r).join(' | ') + ' |')
        .join('\n');
      return '\n\n' + header + '\n' + sep + '\n' + body + '\n\n';
    },
  });
}

@Injectable()
export class ExportDocumentService implements ExportDocumentGateway {
  protected readonly _type = ExportDocumentService.name;

  private readonly turndownService: TurndownService;

  public constructor() {
    this.turndownService = new TurndownService();
    addTableRule(this.turndownService);
  }

  public convertHtmlToMarkdown(html: string): string {
    return this.turndownService.turndown(html);
  }

  public async convertMarkdownToHtml(markdown: string): Promise<string> {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
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
    format: ExportDocumentFormatEnum,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<Buffer> {
    const isHtml =
      typeof markdownContent === 'string' &&
      markdownContent.trimStart().startsWith('<');
    const htmlContent = isHtml
      ? markdownContent
      : await this.convertMarkdownToHtml(markdownContent);

    switch (format.toLowerCase()) {
      case 'pdf':
        return this.generatePdfFromHtml(htmlContent, options);
      case 'docx':
        return this.generateDocxFromHtml(htmlContent, options);
      default:
        throw new Error(`Unsupported export document format: ${format}`);
    }
  }

  public async downloadFileAsStreamable(
    content: string,
    format: ExportDocumentFormatEnum,
    name: string,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<StreamableFile> {
    const fileBuffer = await this.downloadFile(content, format, options);

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

  private _wrapPdfHeaderFooterFragment(fragmentHtml: string): string {
    const safeFragment = fragmentHtml.trim();
    if (!safeFragment) {
      return `<div style="font-size:10px;line-height:1;"></div>`;
    }

    return `
      <div style="width:100%; height:50px; box-sizing:border-box; font-size:10px; line-height:1.2;">
        <style>
          body { margin: 0; }
        </style>
        ${safeFragment}
      </div>`;
  }

  private async generatePdfFromHtml(
    htmlContent: string,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<Buffer> {
    const fullHtml = this._buildFullHtmlDocument(htmlContent);
    const browser = await Puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(fullHtml);

    const headerHtml = options?.headerHtml?.trim() ?? '';
    const footerHtml = options?.footerHtml?.trim() ?? '';

    const hasHeader = headerHtml.length > 0;
    const hasFooter = footerHtml.length > 0;
    const displayHeaderFooter = hasHeader || hasFooter;

    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: hasHeader ? '60mm' : '10mm',
        bottom: '20mm',
        left: '5mm',
        right: '10mm',
      },
      displayHeaderFooter,
      headerTemplate: this._wrapPdfHeaderFooterFragment(headerHtml),
      footerTemplate: this._wrapPdfHeaderFooterFragment(footerHtml),
    });
    await browser.close();

    return Buffer.from(pdfUint8Array);
  }

  private async generateDocxFromHtml(
    htmlContent: string,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<Buffer> {
    const fullHtmlDocument = this._buildFullHtmlDocument(htmlContent);

    const headerHtml = options?.headerHtml?.trim() ?? '';
    const footerHtml = options?.footerHtml?.trim() ?? '';

    const hasHeader = headerHtml.length > 0;
    const hasFooter = footerHtml.length > 0;

    const docxResult = await HtmlToDocx(
      fullHtmlDocument,
      hasHeader ? headerHtml : null,
      {
        orientation: 'portrait',
        table: { row: { cantSplit: true } },
        header: hasHeader,
        footer: hasFooter,
        pageNumber: false,
      },
      hasFooter ? footerHtml : null,
    );

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
