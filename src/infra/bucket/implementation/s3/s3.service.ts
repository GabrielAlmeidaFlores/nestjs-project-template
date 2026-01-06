import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
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
import { FileModel } from '@shared/system/model/generic/file.model';

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

  public async getOriginalFileName(fileName: string): Promise<string> {
    const head = await this.s3Client.send(
      new HeadObjectCommand({ Bucket: this.s3BucketName, Key: fileName }),
    );

    const metaVal = head.Metadata?.['original-filename'];
    return metaVal !== undefined
      ? decodeURIComponent(metaVal)
      : new Guid().toString();
  }

  public async update(file: FileModel, fileLocation: string): Promise<string> {
    const fileMetadata = await fileType.fileTypeFromBuffer(file.buffer);
    const fileMimeType = fileMetadata?.mime ?? 'application/octet-stream';

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.s3BucketName,
        Key: fileLocation,
        Body: file.buffer,
        ContentType: fileMimeType,
        Metadata: {
          'original-filename': encodeURIComponent(file.originalName),
        },
      }),
    );

    return fileLocation;
  }

  public async create(file: FileModel): Promise<string> {
    const fileMetadata = await fileType.fileTypeFromBuffer(file.buffer);
    const fileName = new Guid().toString();
    const fileMimeType = fileMetadata?.mime ?? 'application/octet-stream';

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.s3BucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: fileMimeType,
        Metadata: {
          'original-filename': encodeURIComponent(file.originalName),
        },
      }),
    );

    return fileName;
  }

  public async getSignedUrl(fileName: string): Promise<URL> {
    const command = new GetObjectCommand({
      Bucket: this.s3BucketName,
      Key: fileName,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: BucketApplicationVariable.BUCKET_S3_SIGNED_URL_EXPIRES_IN,
    });

    return new URL(signedUrl);
  }

  public async getBuffer(fileName: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.s3BucketName,
      Key: fileName,
    });

    const response = await this.s3Client.send(command);

    const byteArray = await response.Body?.transformToByteArray();
    return Buffer.from(byteArray as Uint8Array);
  }

  public async delete(fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.s3BucketName,
      Key: fileName,
    });

    await this.s3Client.send(command);
  }
}
