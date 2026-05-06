import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';

export interface TeacherRetirementPlanningRejectionWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  activityDescription?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  pendencyReason?: string | null;
  periodConsideration?: string | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  impactMonths?: string | null;
  isPendency?: boolean | null;
  wantsToComplementViaMeuINSS?: boolean | null;
  hasSpecialPeriod?: boolean | null;
  timelineClassification?: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum | null;
  teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;
}
