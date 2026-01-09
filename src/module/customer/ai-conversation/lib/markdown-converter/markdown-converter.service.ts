import { Injectable } from '@nestjs/common';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';

@Injectable()
export class MarkdownConverterService extends MarkdownConverterGateway {
  protected override readonly _type = MarkdownConverterService.name;

  public async convertToHtml(markdown: string): Promise<string> {
    if (/<[a-z][\s\S]*>/i.test(markdown)) {
      return markdown;
    }

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(markdown);

    return String(file);
  }
}
