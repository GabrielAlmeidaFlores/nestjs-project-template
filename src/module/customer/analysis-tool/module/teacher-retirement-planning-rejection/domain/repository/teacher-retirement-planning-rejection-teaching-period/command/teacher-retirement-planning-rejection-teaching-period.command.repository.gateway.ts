import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/teacher-retirement-planning-rejection-teaching-period.entity';

export abstract class TeacherRetirementPlanningRejectionTeachingPeriodCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionTeachingPeriod(
    props: TeacherRetirementPlanningRejectionTeachingPeriodEntity,
  ): TransactionType;

  public abstract deleteAllByTeacherRetirementPlanningRejectionId(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): TransactionType;
}
