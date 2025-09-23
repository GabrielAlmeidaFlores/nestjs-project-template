import { Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { BucketApplicationVariable } from '@shared/system/constant/application-variable/source/bucket.application-variable';

@Injectable()
export class FileProcessorService implements FileProcessorGateway {
  protected readonly _type = FileProcessorService.name;

  public constructor(private readonly bucketGateway: BucketGateway) {}

  public async getProfilePicture(profilePictureLocation: string): Promise<URL> {
    return await this.bucketGateway.get(profilePictureLocation);
  }

  public async processAndUploadProfilePicture(
    profilePicture: Buffer,
    profilePictureLocation?: string,
  ): Promise<string> {
    const uploadProfilePicture =
      profilePictureLocation === undefined
        ? await this.bucketGateway.create(
            profilePicture,
            BucketApplicationVariable.BUCKET_FILE_LOCATION_CUSTOMER_PROFILE_PICTURE,
          )
        : await this.bucketGateway.update(
            profilePicture,
            profilePictureLocation,
          );

    return uploadProfilePicture;
  }
}
