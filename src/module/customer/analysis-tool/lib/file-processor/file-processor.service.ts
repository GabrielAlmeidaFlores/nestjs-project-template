import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class FileProcessorService implements FileProcessorGateway {
  protected readonly _type = FileProcessorService.name;

  public constructor(
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
  ) {}

  public async getOriginalFileName(fileName: string): Promise<string> {
    return await this.bucketGateway.getOriginalFileName(fileName);
  }

  public async getFileSignedUrl(fileName: string): Promise<URL> {
    return await this.bucketGateway.getSignedUrl(fileName);
  }

  public async getFileBuffer(fileName: string): Promise<Buffer> {
    return await this.bucketGateway.getBuffer(fileName);
  }

  public async uploadFile(
    document: FileModel,
    documentLocation?: string,
  ): Promise<string> {
    const uploadCnisDocument =
      documentLocation === undefined
        ? await this.bucketGateway.create(document)
        : await this.bucketGateway.update(document, documentLocation);

    return uploadCnisDocument;
  }
}
