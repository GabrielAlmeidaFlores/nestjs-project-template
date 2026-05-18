import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-earnings-history/retirement-permanent-disability-rejection-period-earnings-history.entity';

export abstract class RetirementPermanentDisabilityRejectionPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionPeriodEarningsHistory(
    props: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionPeriodEarningsHistoryByPeriodId(
    periodId: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType;
}
