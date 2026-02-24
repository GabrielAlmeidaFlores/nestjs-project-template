import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

export class GetTeacherRetirementPlanningResultQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningResultId;
  public readonly teacherRetirementPlanningCompleteAnalysis: string | null;
  public readonly teacherRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly teacherRetirementPlanningCompleteAnalysisDownload: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningResultQueryResult.name;
}
