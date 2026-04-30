import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document.entity';

export abstract class TeacherRetirementPlanningRejectionTeachingPeriodDocumentCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionTeachingPeriodDocument(
    props: TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTeacherRetirementPlanningRejectionTeachingPeriodId(
    teacherRetirementPlanningRejectionTeachingPeriodId: TeacherRetirementPlanningRejectionTeachingPeriodId,
  ): TransactionType;
}
