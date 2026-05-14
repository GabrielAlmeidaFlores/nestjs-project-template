import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/permanent-incapacity-benefit-terminated-work-periods-earnings-history.entity';

export abstract class PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistory(
    props: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;
}
