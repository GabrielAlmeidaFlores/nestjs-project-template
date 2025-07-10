import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';

export abstract class BaseTransactionRepositoryGateway {
  public abstract commit(event: TransactionEventType[]): Promise<void>;
}
