import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCnisCompleteAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getCnisSimplifiedAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingCompleteAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingSimplifiedAnalysis(
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
