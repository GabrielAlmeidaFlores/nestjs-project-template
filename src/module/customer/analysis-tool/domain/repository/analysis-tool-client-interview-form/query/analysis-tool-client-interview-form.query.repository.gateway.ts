import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { GetAnalysisToolClientInterviewFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-interview-form/query/result/get-analysis-tool-client-interview-form.query.result';

export abstract class AnalysisToolClientInterviewFormQueryRepositoryGateway {
  public abstract findByAnalysisToolClientId(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientInterviewFormQueryResult | null>;
}
