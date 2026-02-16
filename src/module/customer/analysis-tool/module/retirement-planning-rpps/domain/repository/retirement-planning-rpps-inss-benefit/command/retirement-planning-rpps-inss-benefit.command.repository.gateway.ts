import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/retirement-planning-rpps-inss-benefit.entity';
import type { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

export abstract class RetirementPlanningRppsInssBenefitCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsInssBenefit(
    props: RetirementPlanningRppsInssBenefitEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsInssBenefit(
    id: RetirementPlanningRppsInssBenefitId,
  ): TransactionType;
}
