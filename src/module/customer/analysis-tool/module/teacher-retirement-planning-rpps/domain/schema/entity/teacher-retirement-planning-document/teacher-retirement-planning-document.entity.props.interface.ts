import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

export interface TeacherRetirementPlanningRppsDocumentEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsDocumentId> {
  document: string;
  teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;
}
