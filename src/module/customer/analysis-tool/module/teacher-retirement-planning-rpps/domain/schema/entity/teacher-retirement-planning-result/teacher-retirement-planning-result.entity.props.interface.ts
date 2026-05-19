import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/value-object/teacher-retirement-planning-result-id.value-object';

export interface TeacherRetirementPlanningRppsResultEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsResultId> {
  teacherRetirementPlanningCompleteAnalysis?: string | null;
  teacherRetirementPlanningSimplifiedAnalysis?: string | null;
  teacherRetirementPlanningCompleteAnalysisDownload?: string | null;
}
