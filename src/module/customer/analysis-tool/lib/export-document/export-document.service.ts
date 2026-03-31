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
import { OrganizationCustomizationDocumentFooterTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/enum/organization-customization-document-footer-template-type.enum';
import { OrganizationCustomizationDocumentHeaderTemplateTypeEnum } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/enum/organization-customization-document-header-template-type.enum';

import type { ExportDocumentDownloadOptionsInterface } from '@module/customer/analysis-tool/lib/export-document/export-document-download-options.interface';

const A4_WIDTH_MM = 210;
const MM_PER_INCH = 25.4;
const CSS_PX_PER_INCH = 96;

/** Largura ~A4 em CSS px, alinhada à área útil do header no PDF. */
const PDF_HEADER_VIEWPORT_WIDTH_PX = Math.round(
  (A4_WIDTH_MM / MM_PER_INCH) * CSS_PX_PER_INCH,
);

const HEADER_CAPTURE_VIEWPORT_HEIGHT_PX = 1200;
const HEADER_CAPTURE_VIEWPORT_PADDING_PX = 32;
const HEADER_CAPTURE_SET_CONTENT_TIMEOUT_MS = 20_000;
const HEADER_IMAGE_LOAD_TIMEOUT_MS = 10_000;
const HEADER_CAPTURE_DEVICE_SCALE_FACTOR = 2;

const PDF_MARGIN_HEADER_FALLBACK_MM = 40;
const PDF_MARGIN_BODY_TOP_MM = 10;

const PDF_MARGIN_FOOTER_FALLBACK_MM = 20;
const PDF_MARGIN_FOOTER_MIN_MM = 10;
const PDF_MARGIN_FOOTER_MAX_MM = 40;
const PDF_MARGIN_FOOTER_EXTRA_MM = 2;

function pxToMm(px: number): number {
  return (px * MM_PER_INCH) / CSS_PX_PER_INCH;
}

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
      <div style="width:100%; box-sizing:border-box; font-size:10px; line-height:1.2;">
        <style>
          body { margin: 0; }
        </style>
        ${safeFragment}
      </div>`;
  }

  /**
   * Renderiza HTML isolado como PNG (com cores de fundo) para uso em header/footer do PDF/DOCX,
   * onde o motor nativo ignora ou limita CSS em templates.
   */
  private async _htmlFragmentToPngDataUrl(
    page: Puppeteer.Page,
    fragmentHtml: string,
  ): Promise<{ dataUrl: string; heightPx: number } | null> {
    const trimmed = fragmentHtml.trim();
    if (!trimmed) {
      return null;
    }

    const doc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      #export-fragment-root {
        width: ${PDF_HEADER_VIEWPORT_WIDTH_PX}px;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    </style>
  </head>
  <body>
    <div id="export-fragment-root">${trimmed}</div>
  </body>
</html>`;

    await page.setViewport({
      width: PDF_HEADER_VIEWPORT_WIDTH_PX,
      height: HEADER_CAPTURE_VIEWPORT_HEIGHT_PX,
      deviceScaleFactor: HEADER_CAPTURE_DEVICE_SCALE_FACTOR,
    });

    try {
      await page.setContent(doc, {
        waitUntil: 'networkidle2',
        timeout: HEADER_CAPTURE_SET_CONTENT_TIMEOUT_MS,
      });
    } catch {
      await page.setContent(doc, { waitUntil: 'load' });
    }

    await page.evaluate((timeoutMs: number) => {
      const images = Array.from(document.images);
      return Promise.all(
        images.map(
          (img: HTMLImageElement) =>
            new Promise<void>((resolve) => {
              if (img.complete === true) {
                resolve();
                return;
              }
              img.addEventListener('load', () => resolve());
              img.addEventListener('error', () => resolve());
              window.setTimeout(() => resolve(), timeoutMs);
            }),
        ),
      );
    }, HEADER_IMAGE_LOAD_TIMEOUT_MS);

    const dims = await page.$eval('#export-fragment-root', (el) => {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    });

    const heightPx = Math.max(1, Math.ceil(dims.height));
    const widthPx = Math.max(1, Math.ceil(dims.width));

    await page.setViewport({
      width: PDF_HEADER_VIEWPORT_WIDTH_PX,
      height: Math.max(
        HEADER_CAPTURE_VIEWPORT_HEIGHT_PX,
        heightPx + HEADER_CAPTURE_VIEWPORT_PADDING_PX,
      ),
      deviceScaleFactor: HEADER_CAPTURE_DEVICE_SCALE_FACTOR,
    });

    const png = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: widthPx, height: heightPx },
      omitBackground: false,
    });

    const base64 = Buffer.from(png).toString('base64');
    return {
      dataUrl: `data:image/png;base64,${base64}`,
      heightPx,
    };
  }

  private async _captureHeaderFooterImages(
    browser: Puppeteer.Browser,
    options: ExportDocumentDownloadOptionsInterface | undefined,
    flags: { captureHeader: boolean; captureFooter: boolean },
  ): Promise<{
    header: { dataUrl: string; heightPx: number } | null;
    footer: { dataUrl: string; heightPx: number } | null;
  }> {
    const headerHtml = options?.headerHtml?.trim() ?? '';
    const footerHtml = options?.footerHtml?.trim() ?? '';

    const needCaptureHeader = flags.captureHeader && headerHtml.length > 0;
    const needCaptureFooter = flags.captureFooter && footerHtml.length > 0;

    if (!needCaptureHeader && !needCaptureFooter) {
      return { header: null, footer: null };
    }

    const capturePage = await browser.newPage();
    try {
      let header: { dataUrl: string; heightPx: number } | null = null;
      let footer: { dataUrl: string; heightPx: number } | null = null;

      if (needCaptureHeader) {
        try {
          header = await this._htmlFragmentToPngDataUrl(
            capturePage,
            headerHtml,
          );
        } catch {
          header = null;
        }
      }
      if (needCaptureFooter) {
        try {
          footer = await this._htmlFragmentToPngDataUrl(
            capturePage,
            footerHtml,
          );
        } catch {
          footer = null;
        }
      }

      return { header, footer };
    } finally {
      await capturePage.close();
    }
  }

  /**
   * No PDF, só rasterizamos o cabeçalho para layouts standout (fundo/cores fiéis).
   */
  private _pdfHeaderShouldUseRasterImage(
    options?: ExportDocumentDownloadOptionsInterface,
  ): boolean {
    if (
      options?.headerTemplateType ===
      OrganizationCustomizationDocumentHeaderTemplateTypeEnum.STANDOUT_CLASSIC
    ) {
      return true;
    }
    if (
      options?.headerTemplateType ===
      OrganizationCustomizationDocumentHeaderTemplateTypeEnum.MODERN_STANDOUT
    ) {
      return true;
    }
    return false;
  }

  /**
   * No PDF, alguns templates precisam virar imagem para preservar estilos/cores.
   * Para o footer, o comportamento desejado é:
   * - `CLASSIC`: rasterizar para PNG
   * - `MODERN`: manter o HTML padrão
   */
  private _pdfFooterShouldUseRasterImage(
    options?: ExportDocumentDownloadOptionsInterface,
  ): boolean {
    return (
      options?.footerTemplateType ===
      OrganizationCustomizationDocumentFooterTemplateTypeEnum.CLASSIC
    );
  }

  private _wrapPdfMarginBoxAsImage(dataUrl: string): string {
    return `
      <div style="width:100%;margin:0;padding:0;font-size:0;line-height:0;">
        <img src="${dataUrl}" style="width:100%;height:auto;display:block;" alt="" />
      </div>`;
  }

  private _docxMarginFragmentFromImage(dataUrl: string): string {
    return `<div style="margin:0;padding:0;"><img src="${dataUrl}" alt="" style="width:100%;height:auto;" /></div>`;
  }

  private async generatePdfFromHtml(
    htmlContent: string,
    options?: ExportDocumentDownloadOptionsInterface,
  ): Promise<Buffer> {
    const fullHtml = this._buildFullHtmlDocument(htmlContent);
    const browser = await Puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const headerHtml = options?.headerHtml?.trim() ?? '';
      const footerHtml = options?.footerHtml?.trim() ?? '';

      const hasHeader = headerHtml.length > 0;
      const hasFooter = footerHtml.length > 0;

      const pdfRasterHeader =
        hasHeader && this._pdfHeaderShouldUseRasterImage(options);

      const pdfRasterFooter =
        hasFooter && this._pdfFooterShouldUseRasterImage(options);

      const { header: headerImage, footer: footerImage } =
        await this._captureHeaderFooterImages(browser, options, {
          captureHeader: pdfRasterHeader,
          captureFooter: pdfRasterFooter,
        });

      const page = await browser.newPage();
      await page.setContent(fullHtml);

      const displayHeaderFooter = hasHeader || hasFooter;

      const headerTemplate = !hasHeader
        ? this._wrapPdfHeaderFooterFragment('')
        : headerImage
          ? this._wrapPdfMarginBoxAsImage(headerImage.dataUrl)
          : this._wrapPdfHeaderFooterFragment(headerHtml);

      const footerTemplate = !hasFooter
        ? this._wrapPdfHeaderFooterFragment('')
        : footerImage
          ? this._wrapPdfMarginBoxAsImage(footerImage.dataUrl)
          : this._wrapPdfHeaderFooterFragment(footerHtml);

      const marginTopMm = hasHeader
        ? PDF_MARGIN_HEADER_FALLBACK_MM
        : PDF_MARGIN_BODY_TOP_MM;

      const marginBottomMm = footerImage
        ? Math.min(
            PDF_MARGIN_FOOTER_MAX_MM,
            Math.max(
              PDF_MARGIN_FOOTER_MIN_MM,
              pxToMm(footerImage.heightPx) + PDF_MARGIN_FOOTER_EXTRA_MM,
            ),
          )
        : PDF_MARGIN_FOOTER_FALLBACK_MM;

      const pdfUint8Array = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: `${marginTopMm}mm`,
          bottom: `${marginBottomMm}mm`,
          left: '5mm',
          right: '10mm',
        },
        displayHeaderFooter,
        headerTemplate,
        footerTemplate,
      });

      await page.close();

      return Buffer.from(pdfUint8Array);
    } finally {
      await browser.close();
    }
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

    let headerImage: { dataUrl: string; heightPx: number } | null = null;
    let footerImage: { dataUrl: string; heightPx: number } | null = null;

    if (hasHeader || hasFooter) {
      const browser = await Puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      try {
        const captured = await this._captureHeaderFooterImages(
          browser,
          options,
          {
            captureHeader: hasHeader,
            captureFooter:
              hasFooter &&
              options?.footerTemplateType ===
                OrganizationCustomizationDocumentFooterTemplateTypeEnum.CLASSIC,
          },
        );
        headerImage = captured.header;
        footerImage = captured.footer;
      } finally {
        await browser.close();
      }
    }

    const headerForDocx =
      hasHeader && headerImage
        ? this._docxMarginFragmentFromImage(headerImage.dataUrl)
        : hasHeader
          ? headerHtml
          : null;

    const footerForDocx =
      hasFooter && footerImage
        ? this._docxMarginFragmentFromImage(footerImage.dataUrl)
        : hasFooter
          ? footerHtml
          : null;

    const docxResult = await HtmlToDocx(
      fullHtmlDocument,
      headerForDocx,
      {
        orientation: 'portrait',
        table: { row: { cantSplit: true } },
        header: hasHeader,
        footer: hasFooter,
        pageNumber: false,
      },
      footerForDocx,
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
