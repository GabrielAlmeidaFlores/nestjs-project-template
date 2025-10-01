import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { CnisProcessorModule } from '@lib/cnis-processor/cnis-processor.module';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { FileProcessorService } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.service';

@Module({
  imports: [BucketModule, CnisProcessorModule],
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
