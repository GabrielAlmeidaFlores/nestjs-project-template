import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';

@Entity({ name: 'teacher_retirement_planning_rejection_result' })
export class TeacherRetirementPlanningRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'longtext', nullable: true })
  public inssDecisionAnalysis: string | null;

  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => TeacherRetirementPlanningRejectionTypeormEntity,
    (e) => e.teacherRetirementPlanningRejectionResult,
  )
  public teacherRetirementPlanningRejection?:
    | TeacherRetirementPlanningRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    TeacherRetirementPlanningRejectionResultTypeormEntity.name;
}
