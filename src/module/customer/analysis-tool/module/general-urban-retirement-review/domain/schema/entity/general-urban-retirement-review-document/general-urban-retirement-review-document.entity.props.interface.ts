import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/enum/general-urban-retirement-review-document-type.enum';
import type { GeneralUrbanRetirementReviewDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/value-object/general-urban-retirement-review-document-id/general-urban-retirement-review-document-id.value-object';

export interface GeneralUrbanRetirementReviewDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewDocumentId> {
  document: string;
  type: GeneralUrbanRetirementReviewDocumentTypeEnum;
  generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId;
}
