import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent-document.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitDependentClassEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-class.enum';
import { DeathBenefitDependentTypeEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/enum/death-benefit-dependent-type.enum';

@Entity({ name: 'death_benefit_dependent' })
export class DeathBenefitDependentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'dependent_class', type: 'simple-enum', enum: DeathBenefitDependentClassEnum })
  public dependentClass: DeathBenefitDependentClassEnum;

  @Column({ name: 'dependent_type', type: 'simple-enum', enum: DeathBenefitDependentTypeEnum })
  public dependentType: DeathBenefitDependentTypeEnum;

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
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitDependent,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefit?: DeathBenefitTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitDependent,
  )
  public deathBenefitDependentDocument?: DeathBenefitDependentDocumentTypeormEntity[] | undefined;

  protected override readonly _type = DeathBenefitDependentTypeormEntity.name;
}
