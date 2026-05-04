import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/enum/temporary-incapacity-benefit-termination-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/value-object/temporary-incapacity-benefit-termination-disability-analysis-document-id.value-object';

export interface TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeEnum;
  temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId;
}
