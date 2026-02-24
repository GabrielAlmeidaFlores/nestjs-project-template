import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

export interface TeacherRetirementPlanningResultEntityPropsInterface
  extends BaseEntityPropsInterface<TeacherRetirementPlanningResultId> {
  teacherRetirementPlanningCompleteAnalysis?: string | null;
  teacherRetirementPlanningSimplifiedAnalysis?: string | null;
}
