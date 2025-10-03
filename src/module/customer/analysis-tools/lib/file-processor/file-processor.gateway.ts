import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class FileProcessorGateway {
  public abstract uploadDocument(
    cnisDocument: Buffer,
    cnisDocumentLocation?: string,
  ): Promise<string>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel>;

  public abstract getDocumentBuffer(fileName: string): Promise<Buffer>;

  public abstract getFileSignedUrl(fileName: string): Promise<URL>;
}
