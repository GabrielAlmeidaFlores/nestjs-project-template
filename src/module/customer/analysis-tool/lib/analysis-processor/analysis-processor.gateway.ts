import type { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';

export abstract class AnalysisProcessorGateway {
  public abstract createCnisFastAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract createLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel>;
}
