import { Module } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { S3Module } from '@infra/bucket/implementation/s3/s3.module';
import { S3Service } from '@infra/bucket/implementation/s3/s3.service';

@Module({
  imports: [S3Module],
  providers: [
    {
      provide: BucketGateway,
      useClass: S3Service,
    },
    S3Service,
  ],
  exports: [BucketGateway],
})
export class BucketModule {
  protected readonly _type = BucketModule.name;
}
