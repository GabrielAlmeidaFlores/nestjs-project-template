import type { FileModel } from '@shared/system/model/generic/file.model';

export abstract class BucketGateway {
  public abstract create(file: FileModel, dir?: string): Promise<string>;
  public abstract update(
    file: FileModel,
    fileLocation: string,
  ): Promise<string>;
  public abstract delete(fileName: string): Promise<void>;
  public abstract getSignedUrl(fileName: string): Promise<URL>;
  public abstract getBuffer(fileName: string): Promise<Buffer>;
  public abstract getOriginalFileName(fileName: string): Promise<string>;
}
