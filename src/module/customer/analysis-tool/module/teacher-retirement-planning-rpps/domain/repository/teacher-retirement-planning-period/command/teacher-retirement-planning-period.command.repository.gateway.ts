import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export abstract class TeacherRetirementPlanningRppsPeriodCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriod(
    props: TeacherRetirementPlanningRppsPeriodEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriod(
    id: TeacherRetirementPlanningRppsPeriodId,
  ): TransactionType;
}
