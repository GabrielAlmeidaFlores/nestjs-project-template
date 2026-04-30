import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history.entity';

export abstract class TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistory(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;
}
