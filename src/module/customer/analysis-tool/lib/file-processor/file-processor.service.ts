import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BucketApplicationVariable } from '@shared/system/constant/application-variable/source/bucket.application-variable';

@Injectable()
export class FileProcessorService implements FileProcessorGateway {
  protected readonly _type = FileProcessorService.name;

  public constructor(
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async getFileSignedUrl(fileName: string): Promise<URL> {
    return await this.bucketGateway.getSignedUrl(fileName);
  }

  public async getDocumentBuffer(fileName: string): Promise<Buffer> {
    return await this.bucketGateway.getBuffer(fileName);
  }

  public async uploadDocument(
    cnisDocument: Buffer,
    cnisDocumentLocation?: string,
  ): Promise<string> {
    const uploadCnisDocument =
      cnisDocumentLocation === undefined
        ? await this.bucketGateway.create(
            cnisDocument,
            BucketApplicationVariable.BUCKET_FILE_LOCATION_CUSTOMER_CNIS_DOCUMENT,
          )
        : await this.bucketGateway.update(cnisDocument, cnisDocumentLocation);

    return uploadCnisDocument;
  }
}
