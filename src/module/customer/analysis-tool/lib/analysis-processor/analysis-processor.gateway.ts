import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCnisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
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

  public abstract parseCnisDocument(cnisDocument: Buffer): Promise<CnisModel>;

  public abstract getLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
  ): Promise<string | null>;
}
