import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

import type { TeacherRetirementPlanningRppsResultEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity.props.interface';

export class TeacherRetirementPlanningRppsResultEntity extends BaseEntity<TeacherRetirementPlanningRppsResultId> {
  public readonly teacherRetirementPlanningCompleteAnalysis: string | null;
  public readonly teacherRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly teacherRetirementPlanningCompleteAnalysisDownload:
    | string
    | null;

  protected readonly _type = TeacherRetirementPlanningRppsResultEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsResultEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsResultId, props);
    this.teacherRetirementPlanningCompleteAnalysis =
      props.teacherRetirementPlanningCompleteAnalysis ?? null;
    this.teacherRetirementPlanningSimplifiedAnalysis =
      props.teacherRetirementPlanningSimplifiedAnalysis ?? null;
    this.teacherRetirementPlanningCompleteAnalysisDownload =
      props.teacherRetirementPlanningCompleteAnalysisDownload ?? null;
  }
}
