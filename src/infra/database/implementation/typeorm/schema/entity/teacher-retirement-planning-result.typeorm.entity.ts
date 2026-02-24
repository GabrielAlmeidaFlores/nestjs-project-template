import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_result' })
export class TeacherRetirementPlanningResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'teacher_retirement_planning_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public teacherRetirementPlanningCompleteAnalysis: string | null;

  @Column({
    name: 'teacher_retirement_planning_simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public teacherRetirementPlanningSimplifiedAnalysis: string | null;

  @Column({
    name: 'teacher_retirement_planning_complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public teacherRetirementPlanningCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => TeacherRetirementPlanningTypeormEntity,
    (entity) => entity.result,
  )
  public teacherRetirementPlanning?: TeacherRetirementPlanningTypeormEntity;

  protected override readonly _type =
    TeacherRetirementPlanningResultTypeormEntity.name;
}
