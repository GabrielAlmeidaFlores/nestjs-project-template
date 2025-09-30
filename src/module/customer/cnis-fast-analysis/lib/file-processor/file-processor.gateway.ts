export abstract class FileProcessorGateway {
  public abstract processAndUploadCnisDocument(
    cnisDocument: Buffer,
    cnisDocumentLocation?: string,
  ): Promise<string>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;
}
