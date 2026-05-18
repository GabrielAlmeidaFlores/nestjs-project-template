import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.entity';

export abstract class TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistory(
    props: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;
}
