export abstract class BucketGateway {
  public abstract create(fileBuffer: Buffer): Promise<string>;
  public abstract get(fileName: string): Promise<URL>;
  public abstract delete(fileName: string): Promise<void>;
}
