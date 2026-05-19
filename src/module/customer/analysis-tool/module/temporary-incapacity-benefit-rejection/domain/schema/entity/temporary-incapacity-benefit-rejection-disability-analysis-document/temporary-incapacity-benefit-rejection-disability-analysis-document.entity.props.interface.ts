import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/enum/temporary-incapacity-benefit-rejection-disability-analysis-document-type.enum';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/value-object/temporary-incapacity-benefit-rejection-disability-analysis-document-id.value-object';

export interface TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentId> {
  fileName: string;
  type: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeEnum;
  temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId;
}
