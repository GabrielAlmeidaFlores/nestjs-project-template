import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import type { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import type { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

export interface TeacherRetirementPlanningRejectionEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  category?: TeacherRetirementPlanningRejectionCategoryEnum | null;
  activityType?: TeacherRetirementPlanningRejectionActivityTypeEnum | null;
  activityTypeDescription?: string | null;
  denialReason?: TeacherRetirementPlanningRejectionDenialReasonEnum | null;
  denialReasonDescription?: string | null;
  teacherRetirementPlanningRejectionResultId?: TeacherRetirementPlanningRejectionResultId | null;
}
