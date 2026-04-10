import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantDependentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity.props.interface';
import type { DeathBenefitGrantDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-class.enum';
import type { DeathBenefitGrantDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-type.enum';

export class DeathBenefitGrantDependentEntity extends BaseEntity<DeathBenefitGrantDependentId> {
  public readonly name: string;
  public readonly dependentClass: DeathBenefitGrantDependentClassEnum;
  public readonly dependentType: DeathBenefitGrantDependentTypeEnum;
  public readonly gender: GenderEnum;
  public readonly birthDate: Date;
  public readonly hasDisabilityOrInvalidism: boolean;
  public readonly isMinorUnder16: boolean;
  public readonly stableUnionOrMarriageStartDate: Date | null;
  public readonly deathBenefitGrantId: DeathBenefitGrantId;

  protected readonly _type = DeathBenefitGrantDependentEntity.name;

  public constructor(props: DeathBenefitGrantDependentEntityPropsInterface) {
    super(DeathBenefitGrantDependentId, props);
    this.name = props.name;
    this.dependentClass = props.dependentClass;
    this.dependentType = props.dependentType;
    this.gender = props.gender;
    this.birthDate = props.birthDate;
    this.hasDisabilityOrInvalidism = props.hasDisabilityOrInvalidism;
    this.isMinorUnder16 = props.isMinorUnder16;
    this.stableUnionOrMarriageStartDate =
      props.stableUnionOrMarriageStartDate ?? null;
    this.deathBenefitGrantId = props.deathBenefitGrantId;
  }
}
