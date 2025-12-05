import type { CnisAnalyzerOutputCompleteModel } from '@lib/cnis-analysis/model/output/cnis-analyzer-output-complete.model';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

export abstract class CnisAnalyzerGateway {
  public abstract analyseCnisDocument(
    data: CnisOutputModel,
    analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult,
  ): Promise<CnisAnalyzerOutputCompleteModel>;
}
