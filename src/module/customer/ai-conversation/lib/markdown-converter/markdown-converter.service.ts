import { Injectable } from '@nestjs/common';

import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';

@Injectable()
export class MarkdownConverterService extends MarkdownConverterGateway {
  protected override readonly _type = MarkdownConverterService.name;

  public convertToHtml(text: string): string {
    if (this.isAlreadyHtml(text)) {
      return text;
    }

    return this.convertMarkdownToHtml(text);
  }

  public isAlreadyHtml(text: string): boolean {
    const htmlTags = [
      '<strong>',
      '<em>',
      '<ul>',
      '<li>',
      '<p>',
      '<br>',
      '<a ',
      '<div>',
      '<span>',
      '<h1>',
      '<h2>',
      '<h3>',
    ];

    return htmlTags.some((tag) => text.includes(tag));
  }

  private convertMarkdownToHtml(markdown: string): string {
    let html = markdown;

    // Converter bold: **texto** ou __texto__ para <strong>texto</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Converter italic: *texto* ou _texto_ para <em>texto</em>
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Converter links: [texto](url) para <a href="url">texto</a>
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    // Converter listas
    html = this.convertLists(html);

    // Converter quebras de linha duplas em parágrafos
    html = html
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join('');

    // Converter quebras de linha simples em <br>
    html = html.replace(/\n/g, '<br>');

    return html.trim();
  }

  private convertLists(text: string): string {
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        const content = trimmedLine.substring(2);
        html += `<li>${content}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += line + '\n';
      }
    }

    if (inList) {
      html += '</ul>';
    }

    return html;
  }
}
