import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent-document.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitGrantDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-class.enum';
import { DeathBenefitGrantDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/enum/death-benefit-grant-dependent-type.enum';

@Entity({ name: 'death_benefit_grant_dependent' })
export class DeathBenefitGrantDependentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({
    name: 'dependent_class',
    type: 'simple-enum',
    enum: DeathBenefitGrantDependentClassEnum,
  })
  public dependentClass: DeathBenefitGrantDependentClassEnum;

  @Column({
    name: 'dependent_type',
    type: 'simple-enum',
    enum: DeathBenefitGrantDependentTypeEnum,
  })
  public dependentType: DeathBenefitGrantDependentTypeEnum;

  @Column({ name: 'sex', type: 'simple-enum', enum: GenderEnum })
  public sex: GenderEnum;

  @Column({
    name: 'birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date;

  @Column({ name: 'has_disability_or_invalidism', type: 'boolean' })
  public hasDisabilityOrInvalidism: boolean;

  @Column({ name: 'is_minor_under_16', type: 'boolean' })
  public isMinorUnder16: boolean;

  @Column({
    name: 'stable_union_or_marriage_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public stableUnionOrMarriageStartDate: Date | null;

  @ManyToOne(
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantDependent,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_grant_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitGrantDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitGrantDependent,
  )
  public deathBenefitGrantDependentDocument?:
    | DeathBenefitGrantDependentDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DeathBenefitGrantDependentTypeormEntity.name;
}
