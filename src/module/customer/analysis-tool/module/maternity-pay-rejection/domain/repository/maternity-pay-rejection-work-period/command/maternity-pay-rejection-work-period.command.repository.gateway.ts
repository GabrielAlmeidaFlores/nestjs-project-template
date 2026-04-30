import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import type { MaternityPayRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/maternity-pay-rejection-work-period.entity';

export abstract class MaternityPayRejectionWorkPeriodCommandRepositoryGateway {
  public abstract createMaternityPayRejectionWorkPeriod(
    props: MaternityPayRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteAllMaternityPayRejectionWorkPeriodByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType;
}
