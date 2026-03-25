import { Inject, Injectable } from '@nestjs/common';

import { BucketGateway } from '@infra/bucket/bucket.gateway';
import { ImageProcessorGateway } from '@lib/image-processor/image-processor.gateway';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
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

  public async uploadOrganizationLogo(
    organizationLogo: FileModel,
    organizationLogoLocation?: string,
  ): Promise<string> {
    return organizationLogoLocation === undefined
      ? await this.bucketGateway.create(organizationLogo)
      : await this.bucketGateway.update(
          organizationLogo,
          organizationLogoLocation,
        );
  }

  public async uploadOrganizationLogoFromBase64(
    organizationLogo: Base64FileRequestDto,
    organizationLogoLocation?: string,
  ): Promise<string> {
    const buffer = Buffer.from(organizationLogo.base64.toString(), 'base64');

    const fileModel = FileModel.build({
      buffer,
      originalName: organizationLogo.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    return this.uploadOrganizationLogo(fileModel, organizationLogoLocation);
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
        ? await this.bucketGateway.create(profilePicture)
        : await this.bucketGateway.update(
            profilePicture,
            profilePictureLocation,
          );

    return uploadProfilePicture;
  }
}
