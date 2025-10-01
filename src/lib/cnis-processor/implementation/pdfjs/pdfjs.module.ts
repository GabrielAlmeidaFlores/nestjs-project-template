import { Module } from '@nestjs/common';

import { PdfJSService } from '@lib/cnis-processor/implementation/pdfjs/pdfjs.service';

@Module({
  providers: [PdfJSService],
  exports: [PdfJSService],
})
export class PdfJSModule {
  protected readonly _type = PdfJSModule.name;
}
