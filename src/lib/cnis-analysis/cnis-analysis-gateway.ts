import { CnisOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-output-complete.model';

export abstract class CnisAnalysisGateway {
  public abstract parseCnisDocumentComplete(
    cnisDocument: Buffer,
  ): Promise<CnisOutputCompleteModel>;
}
