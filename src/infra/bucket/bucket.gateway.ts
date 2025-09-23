export abstract class BucketGateway {
  public abstract create(fileBuffer: Buffer, dir?: string): Promise<string>;
  public abstract update(
    fileBuffer: Buffer,
    fileLocation: string,
  ): Promise<string>;
  public abstract get(fileName: string): Promise<URL>;
  public abstract delete(fileName: string): Promise<void>;
}
