export abstract class FileProcessorGateway {
  public abstract processAndUploadProfilePicture(
    profilePicture: Buffer,
    profilePictureLocation?: string,
  ): Promise<string>;
  public abstract getProfilePicture(
    profilePictureLocation: string,
  ): Promise<URL>;
  public abstract getOrganizationLogo(
    organizationLogoLocation: string,
  ): Promise<URL>;
}
