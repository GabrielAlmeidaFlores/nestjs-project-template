import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class DocumentAnalysisGateway {
  public abstract getCompleteAnalyzeCnis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSimplifiedAnalyzeCnis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel>;
}
