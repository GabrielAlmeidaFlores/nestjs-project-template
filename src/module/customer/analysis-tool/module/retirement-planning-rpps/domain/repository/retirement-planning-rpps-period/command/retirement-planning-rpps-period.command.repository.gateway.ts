import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import type { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

export abstract class RetirementPlanningRppsPeriodCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsPeriod(
    props: RetirementPlanningRppsPeriodEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsPeriod(
    id: RetirementPlanningRppsPeriodId,
    props: RetirementPlanningRppsPeriodEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRppsPeriod(
    id: RetirementPlanningRppsPeriodId,
  ): TransactionType;
}
