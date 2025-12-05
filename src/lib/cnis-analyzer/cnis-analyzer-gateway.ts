import type { CnisAnalysisResultModel } from '@lib/cnis-analyzer/model/generic/cnis-analysis-result.model';
import type { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

export abstract class CnisAnalyzerGateway {
  public abstract analyzeCnisDocument(
    data: CnisModel,
    analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult,
  ): Promise<CnisAnalysisResultModel>;
}
