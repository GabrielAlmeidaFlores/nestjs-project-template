import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCnisCompleteAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null>;

  public abstract getCnisSimplifiedAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null>;

  public abstract getLegalPleadingCompleteAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null>;

  public abstract getLegalPleadingSimplifiedAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel>;

  public abstract getLegalPleadingQuickDocumentAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null>;
}
