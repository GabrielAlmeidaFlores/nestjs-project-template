import { Module } from '@nestjs/common';

import { CnisHandlerGateway } from '@lib/cnis-handler/cnis-handler.gateway';
import { PdfJSModule } from '@lib/cnis-handler/implementation/pdfjs/pdfjs.module';
import { PdfJSService } from '@lib/cnis-handler/implementation/pdfjs/pdfjs.service';

@Module({
  imports: [PdfJSModule],
  providers: [
    {
      provide: CnisHandlerGateway,
      useClass: PdfJSService,
    },
    PdfJSService,
  ],
  exports: [CnisHandlerGateway],
})
export class CnisHandlerModule {
  protected readonly _type = CnisHandlerModule.name;
}
