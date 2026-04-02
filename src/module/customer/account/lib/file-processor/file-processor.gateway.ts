import type { Base64FileRequestDto } from '@shared/api/util/dto/request/base64-file.request.dto';
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
  public abstract uploadOrganizationLogo(
    organizationLogo: FileModel,
    organizationLogoLocation?: string,
  ): Promise<string>;
  public abstract uploadOrganizationLogoFromBase64(
    organizationLogo: Base64FileRequestDto,
    organizationLogoLocation?: string,
  ): Promise<string>;
  public abstract getOriginalFileName(fileLocation: string): Promise<string>;
}
