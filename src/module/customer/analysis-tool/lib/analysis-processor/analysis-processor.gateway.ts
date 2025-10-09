import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCompleteCnisAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getSimplifiedCnisAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel>;

  public abstract getLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
  ): Promise<string | null>;
}
