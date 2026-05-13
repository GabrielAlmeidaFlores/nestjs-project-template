import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity';
import type { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export abstract class TeacherRetirementPlanningRppsInssBenefitCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningInssBenefit(
    props: TeacherRetirementPlanningRppsInssBenefitEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningInssBenefit(
    id: TeacherRetirementPlanningRppsInssBenefitId,
  ): TransactionType;
}
