import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'teacher_retirement_planning_remuneration' })
export class TeacherRetirementPlanningRemunerationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'contribution_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: false,
  })
  public contributionDate: Date;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public amount: string;

  @ManyToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.remunerations,
  )
  @JoinColumn({ name: 'teacher_retirement_planning_id' })
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningRemunerationTypeormEntity.name;
}
