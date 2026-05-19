import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';

export abstract class MaternityPayRejectionResultCommandRepositoryGateway {
  public abstract createMaternityPayRejectionResult(
    props: MaternityPayRejectionResultEntity,
  ): TransactionType;

  public abstract updateMaternityPayRejectionResult(
    props: MaternityPayRejectionResultEntity,
  ): TransactionType;
}
