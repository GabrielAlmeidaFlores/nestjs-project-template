import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitDependentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/value-object/death-benefit-dependent-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitDependentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity.props.interface';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-class.enum';
import type { DeathBenefitDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-type.enum';

export class DeathBenefitDependentEntity extends BaseEntity<DeathBenefitDependentId> {
  public readonly name: string;
  public readonly dependentClass: DeathBenefitDependentClassEnum;
  public readonly dependentType: DeathBenefitDependentTypeEnum;
  public readonly sex: GenderEnum;
  public readonly birthDate: Date;
  public readonly hasDisabilityOrInvalidism: boolean;
  public readonly isMinorUnder16: boolean;
  public readonly stableUnionOrMarriageStartDate: Date | null;
  public readonly deathBenefitId: DeathBenefitId;

  protected readonly _type = DeathBenefitDependentEntity.name;

  public constructor(props: DeathBenefitDependentEntityPropsInterface) {
    super(DeathBenefitDependentId, props);
    this.name = props.name;
    this.dependentClass = props.dependentClass;
    this.dependentType = props.dependentType;
    this.sex = props.sex;
    this.birthDate = props.birthDate;
    this.hasDisabilityOrInvalidism = props.hasDisabilityOrInvalidism;
    this.isMinorUnder16 = props.isMinorUnder16;
    this.stableUnionOrMarriageStartDate =
      props.stableUnionOrMarriageStartDate ?? null;
    this.deathBenefitId = props.deathBenefitId;
  }
}
