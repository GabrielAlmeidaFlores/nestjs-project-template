import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

export interface GeneralUrbanRetirementReviewEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewId> {
  cnisDocument?: string | null;
  benefitAwardLetterDocument?: string | null;
  analysisName?: string | null;
  category?: string | null;
  myInssPassword?: string | null;
  generalUrbanRetirementReviewResult?: GeneralUrbanRetirementReviewResultEntity | null;
}
