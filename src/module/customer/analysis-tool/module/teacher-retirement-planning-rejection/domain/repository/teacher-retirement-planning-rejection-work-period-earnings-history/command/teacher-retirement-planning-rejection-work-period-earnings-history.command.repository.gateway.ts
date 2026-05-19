import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history.entity';

export abstract class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionWorkPeriodEarningsHistory(
    props: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType;
}
