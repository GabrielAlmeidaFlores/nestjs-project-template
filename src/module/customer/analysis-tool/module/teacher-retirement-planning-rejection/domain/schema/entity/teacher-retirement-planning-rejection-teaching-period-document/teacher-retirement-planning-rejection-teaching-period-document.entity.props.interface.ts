import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/value-object/teacher-retirement-planning-rejection-teaching-period-document-id.value-object';

export interface TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionTeachingPeriodDocumentId> {
  fileName: string;
  teacherRetirementPlanningRejectionTeachingPeriodId: TeacherRetirementPlanningRejectionTeachingPeriodId;
}
