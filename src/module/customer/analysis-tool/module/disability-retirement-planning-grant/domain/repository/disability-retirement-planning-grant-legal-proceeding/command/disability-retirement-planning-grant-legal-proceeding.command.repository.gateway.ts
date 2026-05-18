import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';

export abstract class DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantLegalProceeding(
    props: DisabilityRetirementPlanningGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningGrantId(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): TransactionType;
}
