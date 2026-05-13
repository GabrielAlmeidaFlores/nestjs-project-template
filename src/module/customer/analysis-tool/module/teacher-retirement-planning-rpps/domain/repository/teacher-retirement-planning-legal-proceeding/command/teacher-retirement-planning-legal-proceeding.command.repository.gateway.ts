import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity';
import type { TeacherRetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

export abstract class TeacherRetirementPlanningRppsLegalProceedingCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningLegalProceeding(
    props: TeacherRetirementPlanningRppsLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningLegalProceeding(
    id: TeacherRetirementPlanningRppsLegalProceedingId,
  ): TransactionType;
}
