export abstract class BucketGateway {
  public abstract create(fileBuffer: Buffer, dir?: string): Promise<string>;
  public abstract update(
    fileBuffer: Buffer,
    fileLocation: string,
  ): Promise<string>;
  public abstract delete(fileName: string): Promise<void>;
  public abstract getSignedUrl(fileName: string): Promise<URL>;
  public abstract getBuffer(fileName: string): Promise<Buffer>;
}
