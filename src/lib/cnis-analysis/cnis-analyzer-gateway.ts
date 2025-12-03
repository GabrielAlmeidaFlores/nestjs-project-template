import type { CnisAnalyzerOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-analyzer-output-complete.model';

export abstract class CnisAnalyzerGateway {
  public abstract analyseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisAnalyzerOutputCompleteModel>;
}
