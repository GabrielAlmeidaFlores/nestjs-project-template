import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-earnings-history/special-retirement-grant-earnings-history.entity';

export abstract class SpecialRetirementGrantEarningsHistoryCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantEarningsHistory(
    props: SpecialRetirementGrantEarningsHistoryEntity,
  ): TransactionType;
}
