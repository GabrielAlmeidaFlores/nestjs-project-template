import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';

export interface GeneralUrbanRetirementReviewLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewLegalProceedingId> {
  legalProceedingNumber: string;
  generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;
}
