import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import type { TeacherRetirementPlanningRppsPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

export abstract class TeacherRetirementPlanningRppsPeriodItemDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriodItemDocument(
    props: TeacherRetirementPlanningRppsPeriodItemDocumentEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriodItemDocument(
    id: TeacherRetirementPlanningRppsPeriodItemDocumentId,
  ): TransactionType;
}
