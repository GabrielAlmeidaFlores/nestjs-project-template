import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_rejection_work_period_document' })
export class TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionWorkPeriodDocument,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_work_period_id' })
  public teacherRetirementPlanningRejectionWorkPeriod?:
    | TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity.name;
}
