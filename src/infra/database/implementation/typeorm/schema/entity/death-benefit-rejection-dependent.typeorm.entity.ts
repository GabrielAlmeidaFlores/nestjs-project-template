import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent-document.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitRejectionDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-class.enum';
import { DeathBenefitRejectionDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/enum/death-benefit-rejection-dependent-type.enum';

@Entity({ name: 'death_benefit_rejection_dependent' })
export class DeathBenefitRejectionDependentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({
    name: 'dependent_class',
    type: 'simple-enum',
    enum: DeathBenefitRejectionDependentClassEnum,
  })
  public dependentClass: DeathBenefitRejectionDependentClassEnum;

  @Column({
    name: 'dependent_type',
    type: 'simple-enum',
    enum: DeathBenefitRejectionDependentTypeEnum,
  })
  public dependentType: DeathBenefitRejectionDependentTypeEnum;

  @Column({ name: 'gender', type: 'simple-enum', enum: GenderEnum })
  public gender: GenderEnum;

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
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionDependent,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitRejectionDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitRejectionDependent,
  )
  public deathBenefitRejectionDependentDocument?:
    | DeathBenefitRejectionDependentDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DeathBenefitRejectionDependentTypeormEntity.name;
}
