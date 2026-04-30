import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';

export interface TemporaryIncapacityBenefitTerminationDisabilityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationDisabilityAnalysisId> {
  estimatedDisabilityStartDate: Date;
  shortDisabilityDescription?: string | null;
  disabilityFromAccident: boolean;
  disablingConditionDescription?: string | null;
  disabilityFromSevereDisease: boolean;
  severeDisease?: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum | null;
  diseaseCustomName?: string | null;
  diseaseStartDate?: Date | null;
  needsConstantAssistanceFromAnotherPerson: boolean;
  previousDisabilityBenefit: boolean;
  previousBenefitNumber?: string | null;
  temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId;
}
