import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import type { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import type { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';

export abstract class MaternityPayGrantPeriodCommandRepositoryGateway {
  public abstract createMaternityPayGrantPeriod(
    props: MaternityPayGrantPeriodEntity,
  ): TransactionType;

  public abstract updateMaternityPayGrantPeriod(
    id: MaternityPayGrantPeriodId,
    props: MaternityPayGrantPeriodEntity,
  ): TransactionType;

  public abstract deleteMaternityPayGrantPeriod(
    id: MaternityPayGrantPeriodId,
  ): TransactionType;

  public abstract deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType;
}
