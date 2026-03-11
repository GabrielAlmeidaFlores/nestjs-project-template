import { Module } from '@nestjs/common';

import { MarkdownConverterGateway } from '@lib/markdown-converter/markdown-converter.gateway';
import { MarkdownConverterService } from '@lib/markdown-converter/markdown-converter.service';

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
