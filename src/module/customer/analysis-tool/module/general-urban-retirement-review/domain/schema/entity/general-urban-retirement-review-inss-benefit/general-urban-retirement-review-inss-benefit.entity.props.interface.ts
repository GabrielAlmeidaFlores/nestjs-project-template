import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';

export interface GeneralUrbanRetirementReviewInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewInssBenefitId> {
  inssBenefitNumber: string;
  generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;
}
