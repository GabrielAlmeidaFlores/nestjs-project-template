import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/teacher-retirement-planning-rejection-result.entity';

export abstract class TeacherRetirementPlanningRejectionResultCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionResult(
    props: TeacherRetirementPlanningRejectionResultEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRejectionResult(
    props: TeacherRetirementPlanningRejectionResultEntity,
  ): TransactionType;
}
