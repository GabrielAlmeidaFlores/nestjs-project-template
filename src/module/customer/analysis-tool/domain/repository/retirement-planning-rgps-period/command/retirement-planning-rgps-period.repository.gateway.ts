import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

export abstract class RetirementPlanningRgpsPeriodCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsPeriod(
    props: RetirementPlanningRgpsPeriodEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsPeriod(
    id: RetirementPlanningRgpsPeriodId,
    props: RetirementPlanningRgpsPeriodEntity,
  ): TransactionType;
}
