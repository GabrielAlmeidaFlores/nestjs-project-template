import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-document.typeorm.entity';
import { SpecialRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-inss-benefit.typeorm.entity';
import { SpecialRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-legal-proceeding.typeorm.entity';
import { SpecialRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-result.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_rejection' })
export class SpecialRetirementRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'requirement_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requirementStartDate: Date | null;

  @Column({
    name: 'rejection_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public rejectionDate: Date | null;

  @Column({
    name: 'harmful_agents',
    type: 'simple-array',
    nullable: true,
  })
  public harmfulAgents: string[] | null;

  @Column({
    name: 'other_agents',
    type: 'longtext',
    nullable: true,
  })
  public otherAgents: string | null;

  @Column({
    name: 'rejection_reason',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public rejectionReason: string | null;

  @Column({
    name: 'other_rejection_reason',
    type: 'longtext',
    nullable: true,
  })
  public otherRejectionReason: string | null;

  @OneToOne(
    () => SpecialRetirementRejectionResultTypeormEntity,
    (entity) => entity.specialRetirementRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_result_id' })
  public specialRetirementRejectionResult?:
    | SpecialRetirementRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionDocumentTypeormEntity,
    (entity) => entity.specialRetirementRejection,
  )
  public specialRetirementRejectionDocument?:
    | SpecialRetirementRejectionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionInssBenefitTypeormEntity,
    (entity) => entity.specialRetirementRejection,
  )
  public specialRetirementRejectionInssBenefit?:
    | SpecialRetirementRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionLegalProceedingTypeormEntity,
    (entity) => entity.specialRetirementRejection,
  )
  public specialRetirementRejectionLegalProceeding?:
    | SpecialRetirementRejectionLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejection,
  )
  public specialRetirementRejectionWorkPeriod?:
    | SpecialRetirementRejectionWorkPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialRetirementRejectionTypeormEntity.name;
}
