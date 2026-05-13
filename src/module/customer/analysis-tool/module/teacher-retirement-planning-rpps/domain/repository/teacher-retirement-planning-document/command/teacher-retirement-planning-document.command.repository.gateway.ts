import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity';
import type { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

export abstract class TeacherRetirementPlanningRppsDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningDocument(
    props: TeacherRetirementPlanningRppsDocumentEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningDocument(
    id: TeacherRetirementPlanningRppsDocumentId,
  ): TransactionType;
}
