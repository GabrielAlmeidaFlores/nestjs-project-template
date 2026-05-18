import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';

export interface PermanentIncapacityBenefitTerminatedDisabilityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<PermanentIncapacityBenefitTerminatedDisabilityAnalysisId> {
  estimatedDisabilityStartDate: Date;
  shortDisabilityDescription?: string | null;
  disabilityFromAccident: boolean;
  disablingConditionDescription?: string | null;
  disabilityFromSevereDisease: boolean;
  severeDisease?: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum | null;
  diseaseCustomName?: string | null;
  diseaseStartDate?: Date | null;
  needsConstantAssistanceFromAnotherPerson: boolean;
  previousDisabilityBenefit: boolean;
  previousBenefitNumber?: string | null;
  permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId;
}
