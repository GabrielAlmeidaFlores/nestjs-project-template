import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period.entity';
import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';

export abstract class TeacherRetirementPlanningRejectionWorkPeriodCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionWorkPeriod(
    props: TeacherRetirementPlanningRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRejectionWorkPeriod(
    id: TeacherRetirementPlanningRejectionWorkPeriodId,
    props: TeacherRetirementPlanningRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningRejectionWorkPeriod(
    id: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): TransactionType;
}
