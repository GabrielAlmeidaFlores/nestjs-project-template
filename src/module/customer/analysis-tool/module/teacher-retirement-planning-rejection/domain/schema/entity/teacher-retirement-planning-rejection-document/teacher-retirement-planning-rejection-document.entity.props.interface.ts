import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import type { TeacherRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/value-object/teacher-retirement-planning-rejection-document-id.value-object';

export interface TeacherRetirementPlanningRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionDocumentId> {
  fileName: string;
  name: string;
  type: TeacherRetirementPlanningRejectionDocumentTypeEnum;
  teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;
}
