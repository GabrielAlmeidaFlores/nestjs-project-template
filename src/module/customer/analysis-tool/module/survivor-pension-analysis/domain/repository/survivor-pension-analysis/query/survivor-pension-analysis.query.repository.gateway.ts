import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis/query/result/get-survivor-pension-analysis-with-relations.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisQueryRepositoryGateway {
  public abstract findOneById(
    id: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisWithRelationsQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisWithRelationsQueryResult>;
}
