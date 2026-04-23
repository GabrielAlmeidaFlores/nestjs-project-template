import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-document.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'death_benefit_rejection_institutor' })
export class DeathBenefitRejectionInstitorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public cpf: string | null;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date | null;

  @Column({
    name: 'gender',
    type: 'simple-enum',
    enum: GenderEnum,
    nullable: true,
  })
  public gender: GenderEnum | null;

  @Column({
    name: 'death_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public deathDate: Date | null;

  @Column({ name: 'was_retired', type: 'boolean', nullable: true })
  public wasRetired: boolean | null;

  @Column({
    name: 'retirement_benefit_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public retirementBenefitNumber: string | null;

  @Column({
    name: 'is_death_declarant_child_or_spouse',
    type: 'boolean',
    default: false,
  })
  public isDeathDeclarantChildOrSpouse: boolean;

  @Column({
    name: 'death_declarant_relationship_description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public deathDeclarantRelationshipDescription: string | null;

  @Column({
    name: 'wants_to_prove_work_period_not_in_cnis',
    type: 'boolean',
    default: false,
  })
  public wantsToProveWorkPeriodNotInCnis: boolean;

  @Column({
    name: 'was_rural_insured',
    type: 'boolean',
    default: false,
  })
  public wasRuralInsured: boolean;

  @Column({
    name: 'rural_period_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodStartDate: Date | null;

  @Column({
    name: 'rural_period_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralPeriodEndDate: Date | null;

  @Column({
    name: 'rural_period_document_description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public ruralPeriodDocumentDescription: string | null;

  @Column({
    name: 'was_unemployed_at_death',
    type: 'boolean',
    default: false,
  })
  public wasUnemployedAtDeath: boolean;

  @Column({
    name: 'wants_to_prove_disability_before_death',
    type: 'boolean',
    default: false,
  })
  public wantsToProveDisabilityBeforeDeath: boolean;

  @Column({
    name: 'wants_to_prove_unemployment_by_witness',
    type: 'boolean',
    default: false,
  })
  public wantsToProveUnemploymentByWitness: boolean;

  @ManyToOne(
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionBenefitInstitutor,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitRejectionDocumentTypeormEntity,
    (entity) => entity.deathBenefitRejectionInstitutor,
  )
  public deathBenefitRejectionDocument?:
    | DeathBenefitRejectionDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DeathBenefitRejectionInstitorTypeormEntity.name;
}
