import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import type { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export abstract class TeacherRetirementPlanningPeriodItemCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriodItem(
    props: TeacherRetirementPlanningPeriodItemEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriodItem(
    id: TeacherRetirementPlanningPeriodItemId,
  ): TransactionType;
}
