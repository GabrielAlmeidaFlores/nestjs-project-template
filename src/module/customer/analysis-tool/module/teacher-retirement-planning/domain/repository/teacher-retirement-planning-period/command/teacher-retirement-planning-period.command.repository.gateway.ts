import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export abstract class TeacherRetirementPlanningPeriodCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriod(
    props: TeacherRetirementPlanningPeriodEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriod(
    id: TeacherRetirementPlanningPeriodId,
  ): TransactionType;
}
