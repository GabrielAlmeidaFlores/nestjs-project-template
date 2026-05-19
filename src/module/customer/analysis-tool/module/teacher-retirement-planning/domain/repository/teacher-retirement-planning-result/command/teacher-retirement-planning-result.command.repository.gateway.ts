import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export abstract class TeacherRetirementPlanningResultCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningResultEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningResultEntity,
  ): TransactionType;
}
