import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity';
import type { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

export abstract class TeacherRetirementPlanningDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningDocument(
    props: TeacherRetirementPlanningDocumentEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningDocument(
    id: TeacherRetirementPlanningDocumentId,
  ): TransactionType;
}
