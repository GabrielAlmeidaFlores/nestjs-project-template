import { Module } from '@nestjs/common';

import { CnisParserGateway } from '@lib/cnis-parser/cnis-parser.gateway';
import { PdfJSModule } from '@lib/cnis-parser/implementation/pdfjs/pdfjs.module';
import { PdfJSService } from '@lib/cnis-parser/implementation/pdfjs/pdfjs.service';

@Module({
  imports: [PdfJSModule],
  providers: [
    {
      provide: CnisParserGateway,
      useClass: PdfJSService,
    },
    PdfJSService,
  ],
  exports: [CnisParserGateway],
})
export class ImageProcessorModule {
  protected readonly _type = ImageProcessorModule.name;
}
