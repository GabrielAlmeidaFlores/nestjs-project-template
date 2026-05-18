import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/disability-retirement-planning-grant-period-earnings-history.entity';
import type { DisabilityRetirementPlanningGrantPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-earnings-history/value-object/disability-retirement-planning-grant-period-earnings-history-id.value-object';

export abstract class DisabilityRetirementPlanningGrantPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantPeriodEarningsHistory(
    props: DisabilityRetirementPlanningGrantPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningGrantPeriodEarningsHistory(
    id: DisabilityRetirementPlanningGrantPeriodEarningsHistoryId,
  ): TransactionType;

  public abstract deleteAllByDisabilityRetirementPlanningGrantPeriodId(
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): TransactionType;
}
