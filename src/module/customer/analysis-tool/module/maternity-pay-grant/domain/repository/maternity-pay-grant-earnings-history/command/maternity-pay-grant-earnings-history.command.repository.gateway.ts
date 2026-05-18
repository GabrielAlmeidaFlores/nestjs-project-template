import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-earnings-history/maternity-pay-grant-earnings-history.entity';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

export abstract class MaternityPayGrantEarningsHistoryCommandRepositoryGateway {
  public abstract createMaternityPayGrantEarningsHistory(
    props: MaternityPayGrantEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantPeriodId(
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): TransactionType;
}
