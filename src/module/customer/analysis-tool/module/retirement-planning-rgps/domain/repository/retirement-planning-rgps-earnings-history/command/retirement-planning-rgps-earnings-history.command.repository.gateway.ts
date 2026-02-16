import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/retirement-planning-rgps-earnings-history.entity';
import type { RetirementPlanningRgpsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-earnings-history/value-object/retirement-planning-rgps-earnings-history-id.value-object';

export abstract class RetirementPlanningRgpsEarningsHistoryCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsEarningsHistory(
    props: RetirementPlanningRgpsEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteRetirementPlanningRgpsEarningsHistory(
    id: RetirementPlanningRgpsEarningsHistoryId,
  ): TransactionType;
}
