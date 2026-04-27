import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';
import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';

export interface TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId> {
  estimatedDisabilityStartDate: Date;
  shortDisabilityDescription?: string | null;
  disabilityFromAccident: boolean;
  disablingConditionDescription?: string | null;
  disabilityFromSevereDisease: boolean;
  severeDisease?: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum | null;
  diseaseCustomName?: string | null;
  diseaseStartDate?: Date | null;
  needsConstantAssistanceFromAnotherPerson: boolean;
  previousDisabilityBenefit: boolean;
  temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId;
}
