import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';

export interface TeacherRetirementPlanningDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<TeacherRetirementPlanningDocumentId> {
  document: string;
  teacherRetirementPlanning: TeacherRetirementPlanningEntity;
}
