import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';

export abstract class RetirementPlanningRgpsInssBenefitCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsInssBenefit(
    props: RetirementPlanningRgpsInssBenefitEntity,
  ): TransactionType;
}
