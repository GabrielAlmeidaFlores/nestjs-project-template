import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/teacher-retirement-planning-legal-proceeding.entity';
import type { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

export abstract class TeacherRetirementPlanningLegalProceedingCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningLegalProceeding(
    props: TeacherRetirementPlanningLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningLegalProceeding(
    id: TeacherRetirementPlanningLegalProceedingId,
  ): TransactionType;
}
