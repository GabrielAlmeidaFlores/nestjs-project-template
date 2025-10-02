import { Module } from '@nestjs/common';

import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { PdfJSModule } from '@lib/cnis-processor/implementation/pdfjs/pdfjs.module';
import { PdfJSService } from '@lib/cnis-processor/implementation/pdfjs/pdfjs.service';

@Module({
  imports: [PdfJSModule],
  providers: [
    {
      provide: CnisProcessorGateway,
      useClass: PdfJSService,
    },
    PdfJSService,
  ],
  exports: [CnisProcessorGateway],
})
export class CnisProcessorModule {
  protected readonly _type = CnisProcessorModule.name;
}
