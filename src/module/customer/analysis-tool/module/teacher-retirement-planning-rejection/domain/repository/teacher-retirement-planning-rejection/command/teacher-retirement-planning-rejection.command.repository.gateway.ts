import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

export abstract class TeacherRetirementPlanningRejectionCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejection(
    props: TeacherRetirementPlanningRejectionEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRejection(
    id: TeacherRetirementPlanningRejectionId,
    props: TeacherRetirementPlanningRejectionEntity,
  ): TransactionType;

  public abstract updateTeacherRetirementPlanningRejectionResultId(
    id: TeacherRetirementPlanningRejectionId,
    resultId: TeacherRetirementPlanningRejectionResultId,
  ): TransactionType;
}
