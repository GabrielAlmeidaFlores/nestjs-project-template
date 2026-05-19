import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';

@Entity({ name: 'teacher_retirement_planning_rejection_work_period' })
export class TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

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

  @Column({ name: 'category', type: 'varchar', length: 255, nullable: true })
  public category: string | null;

  @Column({ name: 'activity_description', type: 'longtext', nullable: true })
  public activityDescription: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({ name: 'pendency_reason', type: 'longtext', nullable: true })
  public pendencyReason: string | null;

  @Column({ name: 'period_consideration', type: 'longtext', nullable: true })
  public periodConsideration: string | null;

  @Column({
    name: 'contribution_average',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({ name: 'status', type: 'varchar', length: 255, nullable: true })
  public status: string | null;

  @Column({
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'impact_months',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public impactMonths: string | null;

  @Column({ name: 'is_pendency', type: 'boolean', nullable: true })
  public isPendency: boolean | null;

  @Column({
    name: 'wants_to_complement_via_meu_inss',
    type: 'boolean',
    nullable: true,
  })
  public wantsToComplementViaMeuINSS: boolean | null;

  @Column({ name: 'has_special_period', type: 'boolean', nullable: true })
  public hasSpecialPeriod: boolean | null;

  @Column({
    name: 'timeline_classification',
    type: 'simple-enum',
    enum: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum,
    nullable: true,
  })
  public timelineClassification: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum | null;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionWorkPeriod,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionWorkPeriod,
  )
  public teacherRetirementPlanningRejectionWorkPeriodEarningsHistory?:
    | TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionWorkPeriod,
  )
  public teacherRetirementPlanningRejectionWorkPeriodDocument?:
    | TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity.name;
}
