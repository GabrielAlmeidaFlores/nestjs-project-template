import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { GetAnalysisToolClientCadastralFormQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-cadastral-form/query/result/get-analysis-tool-client-cadastral-form.query.result';

export abstract class AnalysisToolClientCadastralFormQueryRepositoryGateway {
  public abstract findByAnalysisToolClientId(
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<GetAnalysisToolClientCadastralFormQueryResult | null>;
}
