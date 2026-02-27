import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity';
import type { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';

export abstract class DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningInssBenefit(
    props: DisabilityRetirementPlanningInssBenefitEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningInssBenefit(
    id: DisabilityRetirementPlanningInssBenefitId,
  ): TransactionType;
}
