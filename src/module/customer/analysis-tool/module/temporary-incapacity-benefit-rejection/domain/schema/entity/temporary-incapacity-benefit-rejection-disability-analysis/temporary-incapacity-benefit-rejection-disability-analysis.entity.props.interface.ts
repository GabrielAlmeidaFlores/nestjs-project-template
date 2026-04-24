import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/enum/temporary-incapacity-benefit-rejection-severe-disease.enum';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';

export interface TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitRejectionDisabilityAnalysisId> {
  estimatedDisabilityStartDate: Date;
  shortDisabilityDescription?: string | null;
  disabilityFromAccident: boolean;
  disablingConditionDescription?: string | null;
  disabilityFromSevereDisease: boolean;
  severeDisease?: TemporaryIncapacityBenefitRejectionSevereDiseaseEnum | null;
  diseaseCustomName?: string | null;
  diseaseStartDate?: Date | null;
  needsConstantAssistanceFromAnotherPerson: boolean;
  previousDisabilityBenefit: boolean;
  previousBenefitNumber?: string | null;
  temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId;
}
