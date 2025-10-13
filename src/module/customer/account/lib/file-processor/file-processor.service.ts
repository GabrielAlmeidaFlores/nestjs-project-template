import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { BucketApplicationVariable } from '@shared/system/constant/application-variable/source/bucket.application-variable';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class FileProcessorService implements FileProcessorGateway {
  protected readonly _type = FileProcessorService.name;

  public constructor(
    @Inject(BucketGateway)
    private readonly bucketGateway: BucketGateway,
    @Inject(ImageProcessorGateway)
    private readonly imageProcessorGateway: ImageProcessorGateway,
  ) {}

  public async getCustomerProfilePicture(
    profilePictureLocation: string,
  ): Promise<URL> {
    return await this.bucketGateway.getSignedUrl(profilePictureLocation);
  }

  public async getOrganizationLogo(
    organizationLogoLocation: string,
  ): Promise<URL> {
    return await this.bucketGateway.getSignedUrl(organizationLogoLocation);
  }

  public async processAndUploadProfilePicture(
    profilePicture: FileModel,
    profilePictureLocation?: string,
  ): Promise<string> {
    const profilePictureWidth = 1080;
    const profilePictureHeight = 1080;

    profilePicture.buffer = await this.imageProcessorGateway.coverCropCenter(
      profilePicture.buffer,
      profilePictureWidth,
      profilePictureHeight,
    );

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
