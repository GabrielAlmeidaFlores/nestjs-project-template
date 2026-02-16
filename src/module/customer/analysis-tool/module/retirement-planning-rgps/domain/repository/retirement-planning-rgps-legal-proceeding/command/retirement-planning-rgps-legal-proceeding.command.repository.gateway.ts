import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';

export abstract class RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsLegalProceeding(
    props: RetirementPlanningRgpsLegalProceedingEntity,
  ): TransactionType;
}
