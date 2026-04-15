import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/result/get-survivor-pension-analysis-deceased-benefit-dependents.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway {
  public abstract listBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult[]>;

  public abstract findOneById(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult | null>;

  public abstract findOneByIdOrFail(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult>;
}
