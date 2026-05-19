import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';

export abstract class DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionInssBenefit(
    props: DisabilityRetirementPlanningRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningRejectionId(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): TransactionType;
}
