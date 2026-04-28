import type { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

export abstract class GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway {
  public abstract findByGeneralUrbanRetirementReviewPeriodId(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GeneralUrbanRetirementReviewEarningsHistoryEntity[]>;

  public abstract findByGeneralUrbanRetirementReviewPeriodIdBelowMinimum(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GeneralUrbanRetirementReviewEarningsHistoryEntity[]>;
}
