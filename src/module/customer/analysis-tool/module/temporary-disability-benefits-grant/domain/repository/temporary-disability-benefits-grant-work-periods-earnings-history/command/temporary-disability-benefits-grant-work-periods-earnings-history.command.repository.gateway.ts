import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';

export abstract class TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;
}
