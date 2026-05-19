import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import type { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

export interface GeneralUrbanRetirementReviewPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementReviewPeriodDocumentId> {
  document: string;
  generalUrbanRetirementReviewPeriod?: GeneralUrbanRetirementReviewPeriodEntity | null;
}
