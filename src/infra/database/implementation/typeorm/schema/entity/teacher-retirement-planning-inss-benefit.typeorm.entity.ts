import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_inss_benefit' })
export class TeacherRetirementPlanningInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.inssBenefits,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningInssBenefitTypeormEntity.name;
}
