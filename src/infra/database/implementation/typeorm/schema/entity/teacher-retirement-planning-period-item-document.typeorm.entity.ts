import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningPeriodItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period-item.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_period_item_document' })
export class TeacherRetirementPlanningPeriodItemDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'longtext',
    nullable: false,
  })
  public document: string;

  @ManyToOne(
    () => TeacherRetirementPlanningPeriodItemTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_period_item_id' })
  public teacherRetirementPlanningPeriodItem?: TeacherRetirementPlanningPeriodItemTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningPeriodItemDocumentTypeormEntity.name;
}
