import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

export abstract class RetirementPlanningRppsCommandRepositoryGateway {
  public abstract createRetirementPlanningRpps(
    props: RetirementPlanningRppsEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRpps(
    id: RetirementPlanningRppsId,
    props: RetirementPlanningRppsEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRpps(
    id: RetirementPlanningRppsId,
  ): TransactionType;
}
