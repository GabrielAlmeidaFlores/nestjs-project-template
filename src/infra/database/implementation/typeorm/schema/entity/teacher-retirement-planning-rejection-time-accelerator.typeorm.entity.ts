import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-analysis-type.enum';
import { TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-time-accelerator-recognition-inss.enum';
import { TeacherRetirementPlanningRejectionViabilityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-time-accelerator/enum/teacher-retirement-planning-rejection-viability.enum';

@Entity({ name: 'teacher_retirement_planning_rejection_time_accelerator' })
export class TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'time_type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum,
    nullable: true,
  })
  public timeType: TeacherRetirementPlanningRejectionTimeAcceleratorAnalysisTypeEnum | null;

  @Column({ name: 'institution', type: 'varchar', length: 255, nullable: true })
  public institution: string | null;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum,
    nullable: true,
  })
  public recognitionInss: TeacherRetirementPlanningRejectionTimeAcceleratorRecognitionInssEnum | null;

  @Column({
    name: 'affects_qualifying_period',
    type: 'boolean',
    nullable: true,
  })
  public affectsQualifyingPeriod: boolean | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
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
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionViabilityEnum,
    nullable: true,
  })
  public viability: TeacherRetirementPlanningRejectionViabilityEnum | null;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionTimeAccelerator,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity.name;
}
