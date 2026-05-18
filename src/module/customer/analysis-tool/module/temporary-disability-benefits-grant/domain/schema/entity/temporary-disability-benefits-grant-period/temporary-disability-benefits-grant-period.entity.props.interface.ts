import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

export interface TemporaryDisabilityBenefitsGrantPeriodEntityPropsInterface extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantPeriodId> {
  startDate: Date;
  cidTenId?: string | null;
  description?: string | null;
  jobDerivatedDisability: boolean;
  disablingConditionDescription?: string | null;
  disabilityFromSevereDisease: boolean;
  severeDisease?: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum | null;
  diseaseStartDate?: Date | null;
  needsConstantAssistanceFromAnotherPerson: boolean;
  temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
}
