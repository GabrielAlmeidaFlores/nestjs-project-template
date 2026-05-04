import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import type { MaternityPayRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-earnings-history/maternity-pay-rejection-work-period-earnings-history.entity';

export abstract class MaternityPayRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createMaternityPayRejectionWorkPeriodEarningsHistory(
    props: MaternityPayRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionWorkPeriodEarningsHistoryByMaternityPayRejectionWorkPeriodId(
    id: MaternityPayRejectionWorkPeriodId,
  ): TransactionType;
}
