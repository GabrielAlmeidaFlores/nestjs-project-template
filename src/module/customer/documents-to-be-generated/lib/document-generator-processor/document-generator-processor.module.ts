import { Module } from '@nestjs/common';

import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { DocumentGeneratorProcessorGateway } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.gateway';
import { DocumentGeneratorProcessorService } from '@module/customer/documents-to-be-generated/lib/document-generator-processor/document-generator-processor.service';

@Module({
  imports: [GenerativeIaModule],
  providers: [
    {
      provide: DocumentGeneratorProcessorGateway,
      useClass: DocumentGeneratorProcessorService,
    },
  ],
  exports: [DocumentGeneratorProcessorGateway],
})
export class DocumentGeneratorProcessorModule {}
