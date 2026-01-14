import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

export abstract class AnalysisProcessorGateway {
  public abstract getCnisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getCnisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getLegalPleadingSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getRetirementPlanningRppsCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract validateCnisDocument(cnisDocument: Buffer): Promise<boolean>;

  public abstract parseCnisDocument(cnisDocument: Buffer): Promise<CnisModel>;

  public abstract getLegalPleadingQuickDocumentAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;

  public abstract getAdministrativeProcedureInssAnalysisCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null>;
}
