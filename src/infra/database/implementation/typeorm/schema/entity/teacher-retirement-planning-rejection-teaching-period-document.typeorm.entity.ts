import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_rejection_teaching_period_doc' })
export class TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionTeachingPeriodDocument,
  )
  @JoinColumn({
    name: 'teacher_retirement_planning_rejection_teaching_period_id',
  })
  public teacherRetirementPlanningRejectionTeachingPeriod?:
    | TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity.name;
}
