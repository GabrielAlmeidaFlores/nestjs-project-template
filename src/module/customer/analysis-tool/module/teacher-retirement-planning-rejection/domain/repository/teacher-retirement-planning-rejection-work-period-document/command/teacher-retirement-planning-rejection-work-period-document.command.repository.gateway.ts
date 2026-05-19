import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document.entity';

export abstract class TeacherRetirementPlanningRejectionWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionWorkPeriodDocument(
    props: TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTeacherRetirementPlanningRejectionWorkPeriodId(
    teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId,
  ): TransactionType;
}
