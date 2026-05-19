import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

export interface GeneralUrbanRetirementReviewTimeAcceleratorEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewTimeAcceleratorId> {
  timeType: string;
  name?: string | null;
  institution?: string | null;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  affectsQualifyingPeriod?: boolean | null;
  timeGained?: string | null;
  viability?: string | null;
  technicalNote?: string | null;
  recognitionInss: string;
  recognitionJudicial: string;
  generalUrbanRetirementReview?: GeneralUrbanRetirementReviewEntity | null;
}
