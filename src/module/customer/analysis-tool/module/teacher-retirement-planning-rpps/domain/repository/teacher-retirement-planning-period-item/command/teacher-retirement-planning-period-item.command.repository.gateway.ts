import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import type { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export abstract class TeacherRetirementPlanningRppsPeriodItemCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriodItem(
    props: TeacherRetirementPlanningRppsPeriodItemEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriodItem(
    id: TeacherRetirementPlanningRppsPeriodItemId,
  ): TransactionType;
}
