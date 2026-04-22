import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';
import type { DeathBenefitRejectionDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-class.enum';
import type { DeathBenefitRejectionDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-type.enum';

export interface DeathBenefitRejectionDependentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionDependentId> {
  name: string;
  dependentClass: DeathBenefitRejectionDependentClassEnum;
  dependentType: DeathBenefitRejectionDependentTypeEnum;
  gender: GenderEnum;
  birthDate: Date;
  hasDisabilityOrInvalidism: boolean;
  isMinorUnder16: boolean;
  stableUnionOrMarriageStartDate?: Date | null;
  deathBenefitRejectionId: DeathBenefitRejectionId;
}
