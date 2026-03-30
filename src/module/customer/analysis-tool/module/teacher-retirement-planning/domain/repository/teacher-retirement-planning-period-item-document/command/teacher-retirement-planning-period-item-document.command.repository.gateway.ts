import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningPeriodItemDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity';
import type { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

export abstract class TeacherRetirementPlanningPeriodItemDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningPeriodItemDocument(
    props: TeacherRetirementPlanningPeriodItemDocumentEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningPeriodItemDocument(
    id: TeacherRetirementPlanningPeriodItemDocumentId,
  ): TransactionType;
}
