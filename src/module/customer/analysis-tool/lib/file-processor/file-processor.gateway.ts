import type { FileModel } from '@shared/system/model/generic/file.model';

export abstract class FileProcessorGateway {
  public abstract uploadDocument(
    document: FileModel,
    documentLocation?: string,
  ): Promise<string>;

  public abstract getOriginalFileName(fileName: string): Promise<string>;

  public abstract getDocumentBuffer(fileName: string): Promise<Buffer>;

  public abstract getFileSignedUrl(fileName: string): Promise<URL>;
}
