import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TeacherRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/teacher-retirement-planning-inss-benefit.entity';
import type { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export abstract class TeacherRetirementPlanningInssBenefitCommandRepositoryGateway {
  public abstract createTeacherRetirementPlanningInssBenefit(
    props: TeacherRetirementPlanningInssBenefitEntity,
  ): TransactionType;

  public abstract deleteTeacherRetirementPlanningInssBenefit(
    id: TeacherRetirementPlanningInssBenefitId,
  ): TransactionType;
}
