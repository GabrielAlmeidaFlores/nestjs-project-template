import { Injectable } from '@nestjs/common';
import { marked } from 'marked';

import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';

@Injectable()
export class MarkdownConverterService extends MarkdownConverterGateway {
  protected override readonly _type = MarkdownConverterService.name;

  public convertToHtml(text: string): string {
    return this.convertMarkdownToHtml(text);
  }

  private convertMarkdownToHtml(markdown: string): string {
    let html = marked.parse(markdown, {
      breaks: true,
      gfm: true,
      async: false,
    });

    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

    html = this.convertLists(html);

    html = html
      .split('\n\n')
      .map((paragraph) => `<p>${paragraph.trim()}</p>`)
      .join('');

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
