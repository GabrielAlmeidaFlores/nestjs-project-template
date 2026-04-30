import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period-legal-framework.typeorm.entity';

@Entity({ name: 'special_retirement_rejection_work_special_period' })
export class SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'recognized_special_time',
    type: 'boolean',
    nullable: true,
  })
  public recognizedSpecialTime: boolean | null;

  @Column({
    name: 'company_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public companyName: string | null;

  @Column({
    name: 'cnpj',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public cnpj: string | null;

  @Column({
    name: 'position',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public position: string | null;

  @Column({
    name: 'comprobatory_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public comprobatoryDocument: string | null;

  @Column({
    name: 'linked_to_cniss',
    type: 'boolean',
    nullable: true,
  })
  public linkedToCnis: boolean | null;

  @Column({
    name: 'contains_cnis_remuneration_in_period',
    type: 'boolean',
    nullable: true,
  })
  public containsCnisRemunerationInPeriod: boolean | null;

  @Column({
    name: 'technical_justification',
    type: 'text',
    nullable: true,
  })
  public technicalJustification: string | null;

  @Column({
    name: 'additional_observation',
    type: 'text',
    nullable: true,
  })
  public additionalObservation: string | null;

  @Column({
    name: 'lawyer_observation',
    type: 'text',
    nullable: true,
  })
  public lawyerObservation: string | null;

  @Column({
    name: 'exposure_frequency',
    type: 'text',
    nullable: true,
  })
  public exposureFrequency: string | null;

  @Column({
    name: 'information_source',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public informationSource: string | null;

  @Column({
    name: 'identified_agents',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public identifiedAgents: string | null;

  @Column({
    name: 'efficient_epi',
    type: 'boolean',
    nullable: true,
  })
  public efficientEpi: boolean | null;

  @ManyToOne(
    () => SpecialRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkSpecialPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_work_period_id' })
  public specialRetirementRejectionWorkPeriod?: SpecialRetirementRejectionWorkPeriodTypeormEntity | null;

  @OneToMany(
    () =>
      SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkSpecialPeriod,
  )
  public specialRetirementRejectionWorkSpecialPeriodLegalFramework?:
    | SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity.name;
}
