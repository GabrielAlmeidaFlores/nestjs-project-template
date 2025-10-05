import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { FileProcessorService } from '@module/customer/analysis-tool/lib/file-processor/file-processor.service';

@Module({
  imports: [BucketModule],
  providers: [
    {
      useClass: FileProcessorService,
      provide: FileProcessorGateway,
    },
  ],
  exports: [FileProcessorGateway],
})
export class FileProcessorModule {
  protected readonly _type = FileProcessorModule.name;
}
