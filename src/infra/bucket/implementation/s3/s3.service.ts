import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { BucketApplicationVariable } from '@shared/system/constant/application-variable/source/bucket.application-variable';

@Injectable()
export class S3Service implements BucketGateway {
  protected readonly _type = S3Service.name;

  private readonly s3Client: S3Client;
  private readonly s3BucketName: string;

  public constructor() {
    const params: S3ClientConfig = {
      region: BucketApplicationVariable.BUCKET_S3_REGION,
      credentials: {
        accessKeyId: BucketApplicationVariable.BUCKET_S3_ACCESS_KEY_ID,
        secretAccessKey:
          BucketApplicationVariable.BUCKET_S3_ACCESS_KEY_CREDENTIAL,
      },
    };

    this.s3Client = new S3Client(params);
    this.s3BucketName = BucketApplicationVariable.BUCKET_S3_BUCKET_NAME;
  }

  public async create(fileBuffer: Buffer): Promise<string> {
    const fileMetadata = await fileType.fileTypeFromBuffer(fileBuffer);
    const fileName = `${new Guid().toString()}.${fileMetadata?.ext ?? 'bin'}`;
    const fileMimeType = fileMetadata?.mime ?? 'application/octet-stream';

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.s3BucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: fileMimeType,
      }),
    );
    return fileName;
  }

  public async get(fileName: string): Promise<URL> {
    const command = new GetObjectCommand({
      Bucket: this.s3BucketName,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: BucketApplicationVariable.BUCKET_S3_SIGNED_URL_EXPIRES_IN,
    });

    return new URL(signedUrl);
  }

  public async delete(fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.s3BucketName,
      Key: fileName,
    });

    await this.s3Client.send(command);
  }
}
