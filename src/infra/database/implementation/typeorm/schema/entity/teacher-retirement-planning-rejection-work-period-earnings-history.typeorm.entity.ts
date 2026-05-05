import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({ name: 'teacher_retirement_planning_rejection_work_period_earnings' })
export class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'competence', type: 'varchar', length: 255, nullable: true })
  public competence: string | null;

  @Column({
    name: 'remuneration',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public remuneration: string | null;

  @Column({ name: 'indicators', type: 'varchar', length: 255, nullable: true })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'timestamp',
    transformer: DateTransformer,
    nullable: true,
  })
  public paymentDate: Date | null;

  @Column({
    name: 'contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contribution: string | null;

  @Column({
    name: 'contribution_salary',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionSalary: string | null;

  @Column({ name: 'competence_below_minimum', type: 'boolean', nullable: true })
  public competenceBelowMinimum: boolean | null;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionWorkPeriodEarningsHistory,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_work_period_id' })
  public teacherRetirementPlanningRejectionWorkPeriod?:
    | TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity.name;
}
