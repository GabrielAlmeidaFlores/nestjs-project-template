import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-inss.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-recognition-judicial.enum';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-time-accelerator-type.enum';
import { DisabilityRetirementPlanningGrantViabilityEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/enum/disability-retirement-planning-grant-viability.enum';

@Entity({ name: 'disability_retirement_planning_grant_time_accelerator' })
export class DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum,
  })
  public type: DisabilityRetirementPlanningGrantTimeAcceleratorTypeEnum;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum,
  })
  public recognitionInss: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionInssEnum;

  @Column({
    name: 'recognition_judicial',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum,
  })
  public recognitionJudicial: DisabilityRetirementPlanningGrantTimeAcceleratorRecognitionJudicialEnum;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantViabilityEnum,
  })
  public viability: DisabilityRetirementPlanningGrantViabilityEnum;

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
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantTimeAccelerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity.name;
}
