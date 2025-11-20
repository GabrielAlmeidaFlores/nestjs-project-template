import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class BucketApplicationVariable {
  public static readonly defaultBucketS3SignedUrlExpiresIn = 86400;

  public static readonly source = new EnvironmentVariableService();

  public static readonly BUCKET_S3_REGION =
    BucketApplicationVariable.source.getValueOrThrow<string>(
      'BUCKET_S3_REGION',
      String,
    );

  public static readonly BUCKET_S3_ACCESS_KEY_ID =
    BucketApplicationVariable.source.getValueOrThrow<string>(
      'BUCKET_S3_ACCESS_KEY_ID',
      String,
    );

  public static readonly BUCKET_S3_ACCESS_KEY_CREDENTIAL =
    BucketApplicationVariable.source.getValueOrThrow<string>(
      'BUCKET_S3_ACCESS_KEY_CREDENTIAL',
      String,
    );

  public static readonly BUCKET_S3_BUCKET_NAME =
    BucketApplicationVariable.source.getValueOrThrow<string>(
      'BUCKET_S3_BUCKET_NAME',
      String,
    );

  public static readonly BUCKET_S3_SIGNED_URL_EXPIRES_IN =
    BucketApplicationVariable.source.getValueOrDefault<number>(
      'BUCKET_S3_SIGNED_URL_EXPIRES_IN',
      Number,
      BucketApplicationVariable.defaultBucketS3SignedUrlExpiresIn,
    );

  protected readonly _type = BucketApplicationVariable.name;
}
