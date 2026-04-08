import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';
import type { DeathBenefitDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-class.enum';
import type { DeathBenefitDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-type.enum';

export interface DeathBenefitDependentEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitDependentId> {
  name: string;
  dependentClass: DeathBenefitDependentClassEnum;
  dependentType: DeathBenefitDependentTypeEnum;
  sex: GenderEnum;
  birthDate: Date;
  hasDisabilityOrInvalidism: boolean;
  isMinorUnder16: boolean;
  stableUnionOrMarriageStartDate?: Date | null;
  deathBenefitId: DeathBenefitId;
}
