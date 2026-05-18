import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/value-object/general-urban-retirement-review-earnings-history-id.value-object';
import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';

export interface GeneralUrbanRetirementReviewEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewEarningsHistoryId> {
  competence?: Date | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  generalUrbanRetirementReview?: GeneralUrbanRetirementReviewEntity | null;
  generalUrbanRetirementReviewPeriod?: GeneralUrbanRetirementReviewPeriodEntity | null;
  competenceBelowTheMinimum?: boolean | null;
  analysis?: string | null;
}
