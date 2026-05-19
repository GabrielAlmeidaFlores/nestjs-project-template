import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/result/get-survivor-pension-analysis-result.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisResultQueryRepositoryGateway {
  public abstract findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult | null>;

  public abstract findOneById(
    id: SurvivorPensionAnalysisResultId,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisResultQueryResult>;
}
