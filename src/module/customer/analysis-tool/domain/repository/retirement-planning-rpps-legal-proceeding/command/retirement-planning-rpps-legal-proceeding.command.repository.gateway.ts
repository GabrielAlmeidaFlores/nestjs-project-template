import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.entity';
import type { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';

export abstract class RetirementPlanningRppsLegalProceedingCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsLegalProceeding(
    props: RetirementPlanningRppsLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsLegalProceeding(
    id: RetirementPlanningRppsLegalProceedingId,
  ): TransactionType;
}
