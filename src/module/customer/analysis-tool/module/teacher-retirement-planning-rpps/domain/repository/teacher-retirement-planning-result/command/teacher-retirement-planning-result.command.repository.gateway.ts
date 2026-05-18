import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export abstract class TeacherRetirementPlanningRppsResultCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningRppsResultEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningResult(
    props: TeacherRetirementPlanningRppsResultEntity,
  ): TransactionType;
}
