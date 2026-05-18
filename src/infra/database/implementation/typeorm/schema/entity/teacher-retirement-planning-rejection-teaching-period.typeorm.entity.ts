import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-education-level.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-establishment-type.enum';
import { TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/enum/teacher-retirement-planning-rejection-teaching-period-function-performed.enum';

@Entity({ name: 'teacher_retirement_planning_rejection_teaching_period' })
export class TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity extends BaseTypeormEntity {
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
    name: 'institution_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public institutionName: string | null;

  @Column({
    name: 'establishment_type',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum,
    nullable: true,
  })
  public establishmentType: TeacherRetirementPlanningRejectionTeachingPeriodEstablishmentTypeEnum | null;

  @Column({
    name: 'education_level',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum,
    nullable: true,
  })
  public educationLevel: TeacherRetirementPlanningRejectionTeachingPeriodEducationLevelEnum | null;

  @Column({
    name: 'function_performed',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum,
    nullable: true,
  })
  public functionPerformed: TeacherRetirementPlanningRejectionTeachingPeriodFunctionPerformedEnum | null;

  @Column({ name: 'rejection_reason', type: 'longtext', nullable: true })
  public rejectionReason: string | null;

  @Column({
    name: 'legal_basis_for_recognition',
    type: 'longtext',
    nullable: true,
  })
  public legalBasisForRecognition: string | null;

  @Column({ name: 'favorable_jurisprudence', type: 'longtext', nullable: true })
  public favorableJurisprudence: string | null;

  @Column({ name: 'proof_strategy', type: 'longtext', nullable: true })
  public proofStrategy: string | null;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionTeachingPeriod,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionTeachingPeriod,
  )
  public teacherRetirementPlanningRejectionTeachingPeriodDocument?:
    | TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity.name;
}
