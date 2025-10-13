import type { FileModel } from '@shared/system/model/generic/file.model';

export abstract class FileProcessorGateway {
  public abstract processAndUploadProfilePicture(
    profilePicture: FileModel,
    profilePictureLocation?: string,
  ): Promise<string>;
  public abstract getCustomerProfilePicture(
    profilePictureLocation: string,
  ): Promise<URL>;
  public abstract getOrganizationLogo(
    organizationLogoLocation: string,
  ): Promise<URL>;
}
