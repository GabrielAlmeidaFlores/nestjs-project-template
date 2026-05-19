import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_document' })
export class TeacherRetirementPlanningDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningDocumentTypeormEntity.name;
}
