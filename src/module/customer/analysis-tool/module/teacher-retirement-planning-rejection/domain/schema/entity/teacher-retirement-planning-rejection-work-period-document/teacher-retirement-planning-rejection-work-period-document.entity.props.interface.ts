import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/value-object/teacher-retirement-planning-rejection-work-period-document-id.value-object';

export interface TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionWorkPeriodDocumentId> {
  fileName: string;
  teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId;
}
