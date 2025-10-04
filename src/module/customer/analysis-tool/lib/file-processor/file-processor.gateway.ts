export abstract class FileProcessorGateway {
  public abstract uploadDocument(
    cnisDocument: Buffer,
    cnisDocumentLocation?: string,
  ): Promise<string>;

  public abstract getDocumentBuffer(fileName: string): Promise<Buffer>;

  public abstract getFileSignedUrl(fileName: string): Promise<URL>;
}
