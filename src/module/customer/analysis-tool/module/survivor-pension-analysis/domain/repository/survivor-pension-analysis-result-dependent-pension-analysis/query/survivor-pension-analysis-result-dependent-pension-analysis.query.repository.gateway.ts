import type { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/result/get-survivor-pension-analysis-result-dependent-pension-analysis.query.result';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

export abstract class SurvivorPensionAnalysisResultDependentPensionAnalysisQueryRepositoryGateway {
  public abstract findManyBySurvivorPensionAnalysisResultId(
    id: SurvivorPensionAnalysisResultId,
  ): Promise<
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult[]
  >;
}
