import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';

export interface GeneralUrbanRetirementReviewSpecialPeriodEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewSpecialPeriodId> {
  response: string;
  generalUrbanRetirementReview?: GeneralUrbanRetirementReviewEntity | null;
}
