import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import type { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

export abstract class RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsPeriodDisability(
    props: RetirementPlanningRppsPeriodDisabilityEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsPeriodDisability(
    id: RetirementPlanningRppsPeriodDisabilityId,
    props: RetirementPlanningRppsPeriodDisabilityEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsPeriodDisability(
    id: RetirementPlanningRppsPeriodDisabilityId,
  ): TransactionType;
}
