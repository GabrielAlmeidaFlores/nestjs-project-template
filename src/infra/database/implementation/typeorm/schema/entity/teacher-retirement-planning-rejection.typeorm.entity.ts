import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';

@Entity({ name: 'teacher_retirement_planning_rejection' })
export class TeacherRetirementPlanningRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'request_entry_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public requestEntryDate: Date | null;

  @Column({
    name: 'denial_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public denialDate: Date | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionCategoryEnum,
    nullable: true,
  })
  public category: TeacherRetirementPlanningRejectionCategoryEnum | null;

  @Column({
    name: 'activity_type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionActivityTypeEnum,
    nullable: true,
  })
  public activityType: TeacherRetirementPlanningRejectionActivityTypeEnum | null;

  @Column({
    name: 'activity_type_description',
    type: 'longtext',
    nullable: true,
  })
  public activityTypeDescription: string | null;

  @Column({
    name: 'denial_reason',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionDenialReasonEnum,
    nullable: true,
  })
  public denialReason: TeacherRetirementPlanningRejectionDenialReasonEnum | null;

  @Column({
    name: 'denial_reason_description',
    type: 'longtext',
    nullable: true,
  })
  public denialReasonDescription: string | null;

  @OneToOne(
    () => TeacherRetirementPlanningRejectionResultTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_result_id' })
  public teacherRetirementPlanningRejectionResult?:
    | TeacherRetirementPlanningRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionDocumentTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
  )
  public teacherRetirementPlanningRejectionDocument?:
    | TeacherRetirementPlanningRejectionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
  )
  public teacherRetirementPlanningRejectionInssBenefit?:
    | TeacherRetirementPlanningRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
  )
  public teacherRetirementPlanningRejectionTeachingPeriod?:
    | TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
  )
  public teacherRetirementPlanningRejectionWorkPeriod?:
    | TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    (e) => e.teacherRetirementPlanningRejection,
  )
  public teacherRetirementPlanningRejectionTimeAccelerator?:
    | TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity[]
    | undefined;

  @OneToOne(() => AnalysisToolRecordTypeormEntity, {
    nullable: true,
    eager: false,
  })
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTypeormEntity.name;
}
