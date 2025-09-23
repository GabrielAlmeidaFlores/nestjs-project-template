import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { ImageProcessorModule } from '@lib/image-processor/image-processor.module';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { FileProcessorService } from '@module/customer/account/lib/file-processor/file-processor.service';

@Module({
  imports: [BucketModule, ImageProcessorModule],
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
