import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/value-object/teacher-retirement-planning-rejection-work-period-earnings-history-id.value-object';

export interface TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId> {
  competence?: string | null;
  remuneration?: string | null;
  indicators?: string | null;
  paymentDate?: Date | null;
  contribution?: string | null;
  contributionSalary?: string | null;
  competenceBelowMinimum?: boolean | null;
  teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId;
}
