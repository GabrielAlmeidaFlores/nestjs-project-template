import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_rejection_inss_benefit' })
export class TeacherRetirementPlanningRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionInssBenefit,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_rejection_id' })
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionInssBenefitTypeormEntity.name;
}
