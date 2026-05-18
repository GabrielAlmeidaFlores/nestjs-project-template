import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity';
import type { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';

export abstract class DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningLegalProceeding(
    props: DisabilityRetirementPlanningLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningLegalProceeding(
    id: DisabilityRetirementPlanningLegalProceedingId,
  ): TransactionType;
}
