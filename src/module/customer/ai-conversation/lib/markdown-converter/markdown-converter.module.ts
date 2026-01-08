import { Module } from '@nestjs/common';

import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { MarkdownConverterService } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.service';

@Module({
  exports: [MarkdownConverterGateway],
  providers: [
    {
      provide: MarkdownConverterGateway,
      useClass: MarkdownConverterService,
    },
  ],
})
export class MarkdownConverterModule {
  protected readonly _type = MarkdownConverterModule.name;
}
