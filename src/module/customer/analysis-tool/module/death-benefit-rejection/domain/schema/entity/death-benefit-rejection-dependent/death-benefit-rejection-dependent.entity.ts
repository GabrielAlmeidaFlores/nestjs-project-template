import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionDependentEntityPropsInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity.props.interface';
import type { DeathBenefitRejectionDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-class.enum';
import type { DeathBenefitRejectionDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-type.enum';

export class DeathBenefitRejectionDependentEntity extends BaseEntity<DeathBenefitRejectionDependentId> {
  public readonly name: string;
  public readonly dependentClass: DeathBenefitRejectionDependentClassEnum;
  public readonly dependentType: DeathBenefitRejectionDependentTypeEnum;
  public readonly gender: GenderEnum;
  public readonly birthDate: Date;
  public readonly hasDisabilityOrInvalidism: boolean;
  public readonly isMinorUnder16: boolean;
  public readonly stableUnionOrMarriageStartDate: Date | null;
  public readonly deathBenefitRejectionId: DeathBenefitRejectionId;

  protected readonly _type = DeathBenefitRejectionDependentEntity.name;

  public constructor(
    props: DeathBenefitRejectionDependentEntityPropsInterface,
  ) {
    super(DeathBenefitRejectionDependentId, props);
    this.name = props.name;
    this.dependentClass = props.dependentClass;
    this.dependentType = props.dependentType;
    this.gender = props.gender;
    this.birthDate = props.birthDate;
    this.hasDisabilityOrInvalidism = props.hasDisabilityOrInvalidism;
    this.isMinorUnder16 = props.isMinorUnder16;
    this.stableUnionOrMarriageStartDate =
      props.stableUnionOrMarriageStartDate ?? null;
    this.deathBenefitRejectionId = props.deathBenefitRejectionId;
  }
}
