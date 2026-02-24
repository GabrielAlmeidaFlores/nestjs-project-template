import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

import type { TeacherRetirementPlanningResultEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity.props.interface';

export class TeacherRetirementPlanningResultEntity extends BaseEntity<TeacherRetirementPlanningResultId> {
  public readonly teacherRetirementPlanningCompleteAnalysis: string | null;
  public readonly teacherRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly teacherRetirementPlanningCompleteAnalysisDownload: string | null;

  protected readonly _type = TeacherRetirementPlanningResultEntity.name;

  public constructor(props: TeacherRetirementPlanningResultEntityPropsInterface) {
    super(TeacherRetirementPlanningResultId, props);
    this.teacherRetirementPlanningCompleteAnalysis =
      props.teacherRetirementPlanningCompleteAnalysis ?? null;
    this.teacherRetirementPlanningSimplifiedAnalysis =
      props.teacherRetirementPlanningSimplifiedAnalysis ?? null;
    this.teacherRetirementPlanningCompleteAnalysisDownload =
      props.teacherRetirementPlanningCompleteAnalysisDownload ?? null;
  }
}
