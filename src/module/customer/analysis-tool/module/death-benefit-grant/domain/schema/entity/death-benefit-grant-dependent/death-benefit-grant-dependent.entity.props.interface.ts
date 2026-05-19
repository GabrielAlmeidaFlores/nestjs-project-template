import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';
import type { DeathBenefitGrantDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-class.enum';
import type { DeathBenefitGrantDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-type.enum';

export interface DeathBenefitGrantDependentEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantDependentId> {
  name: string;
  dependentClass: DeathBenefitGrantDependentClassEnum;
  dependentType: DeathBenefitGrantDependentTypeEnum;
  gender: GenderEnum;
  birthDate: Date;
  hasDisabilityOrInvalidism: boolean;
  isMinorUnder16: boolean;
  stableUnionOrMarriageStartDate?: Date | null;
  deathBenefitGrantId: DeathBenefitGrantId;
}
