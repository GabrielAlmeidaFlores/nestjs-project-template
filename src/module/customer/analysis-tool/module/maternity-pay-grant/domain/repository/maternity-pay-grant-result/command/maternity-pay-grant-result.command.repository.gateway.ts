import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';

export abstract class MaternityPayGrantResultCommandRepositoryGateway {
  public abstract createMaternityPayGrantResult(
    props: MaternityPayGrantResultEntity,
  ): TransactionType;

  public abstract updateMaternityPayGrantResult(
    props: MaternityPayGrantResultEntity,
  ): TransactionType;
}
