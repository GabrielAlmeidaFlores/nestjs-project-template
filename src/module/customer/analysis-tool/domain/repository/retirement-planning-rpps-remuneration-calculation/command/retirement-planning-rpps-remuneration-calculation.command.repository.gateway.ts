import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import type { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

export abstract class RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsRemunerationCalculation(
    props: RetirementPlanningRppsRemunerationCalculationEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsRemunerationCalculation(
    id: RetirementPlanningRppsRemunerationCalculationId,
    props: RetirementPlanningRppsRemunerationCalculationEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsRemunerationCalculation(
    id: RetirementPlanningRppsRemunerationCalculationId,
  ): TransactionType;
}
