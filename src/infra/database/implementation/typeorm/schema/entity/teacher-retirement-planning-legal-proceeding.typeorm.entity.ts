import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_legal_proceeding' })
export class TeacherRetirementPlanningLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.legalProceedings,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningLegalProceedingTypeormEntity.name;
}
