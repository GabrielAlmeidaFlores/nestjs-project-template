import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/enum/permanent-incapacity-benefit-terminated-disability-analysis-document-type.enum';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/value-object/permanent-incapacity-benefit-terminated-disability-analysis-document-id.value-object';

export interface PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentId> {
  fileName: string;
  type: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum;
  permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId;
}
