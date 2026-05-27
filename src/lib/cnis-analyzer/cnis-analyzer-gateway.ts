import type { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';

export abstract class CnisAnalyzerGateway {
  public abstract analyzeCnisDocument(
    data: CnisModel,
  ): Promise<CnisAnalysisResultModel>;
}
