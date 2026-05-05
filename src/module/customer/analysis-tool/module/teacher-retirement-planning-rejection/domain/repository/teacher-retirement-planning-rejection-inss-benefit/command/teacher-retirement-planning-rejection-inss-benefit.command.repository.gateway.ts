import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/teacher-retirement-planning-rejection-inss-benefit.entity';

export abstract class TeacherRetirementPlanningRejectionInssBenefitCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningRejectionInssBenefit(
    props: TeacherRetirementPlanningRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByTeacherRetirementPlanningRejectionId(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): TransactionType;
}
