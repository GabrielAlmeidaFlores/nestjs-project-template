import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-type.enum';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/enum/disability-retirement-planning-rejection-time-accelerator-viability.enum';

@Entity({ name: 'disability_retirement_planning_rejection_time_accelerator' })
export class DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum,
  })
  public type: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeEnum;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
  })
  public recognitionInss: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum;

  @Column({
    name: 'recognition_judicial',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum,
  })
  public recognitionJudicial: DisabilityRetirementPlanningRejectionTimeAcceleratorRecognitionJudicialEnum;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum,
  })
  public viability: DisabilityRetirementPlanningRejectionTimeAcceleratorViabilityEnum;

  @Column({
    name: 'technical_note',
    type: 'longtext',
    nullable: true,
  })
  public technicalNote: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public startDate: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'institution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public institution: string | null;

  @Column({
    name: 'affects_qualifying_period',
    type: 'boolean',
  })
  public affectsQualifyingPeriod: boolean;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionTimeAccelerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_id' })
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity.name;
}
