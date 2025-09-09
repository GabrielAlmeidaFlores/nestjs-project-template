import type { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export abstract class BaseTransactionRepositoryGateway {
  public abstract execute(
    event: TransactionType | TransactionType[],
  ): Promise<TransactionOutputModel>;
}
