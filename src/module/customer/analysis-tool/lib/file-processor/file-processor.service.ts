import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BucketApplicationVariable } from '@shared/system/constant/application-variable/source/bucket.application-variable';

@Injectable()
export class FileProcessorService implements FileProcessorGateway {
  protected readonly _type = FileProcessorService.name;

  public constructor(
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisParserGateway: CnisProcessorGateway,
  ) {}

  public async parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel> {
    return await this.cnisParserGateway.parseCnisDocument(cnisDocument);
  }

  public async validateCnisDocument(cnisDocument: Buffer): Promise<boolean> {
    return await this.cnisParserGateway.validateCnisDocument(cnisDocument);
  }

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
