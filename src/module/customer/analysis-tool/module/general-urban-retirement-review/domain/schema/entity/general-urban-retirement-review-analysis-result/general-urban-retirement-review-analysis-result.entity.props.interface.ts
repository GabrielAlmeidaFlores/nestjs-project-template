import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/enum/analysis-type.enum';
import type { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

export interface GeneralUrbanRetirementReviewAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewAnalysisResultId> {
  generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity;
  analysisType?: AnalysisTypeEnum | null;
  response: string;
}
