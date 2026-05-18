import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity';

export abstract class RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory(
    props: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;
}
