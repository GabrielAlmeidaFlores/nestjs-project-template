import type { TransactionEventOutputModel } from '@core/domain/repository/base/model/output/transaction-event.output.model';
import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';

export abstract class BaseTransactionRepositoryGateway {
  public abstract execute(
    event: TransactionEventType[],
  ): Promise<TransactionEventOutputModel>;
}
