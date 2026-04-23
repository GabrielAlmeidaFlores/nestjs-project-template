import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-earnings-history/disability-retirement-planning-rejection-period-earnings-history.entity';

export abstract class DisabilityRetirementPlanningRejectionPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionPeriodEarningsHistory(
    props: DisabilityRetirementPlanningRejectionPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
    disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType;
}
