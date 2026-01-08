import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export interface SeederInterface {
  execute():
    | Promise<Array<TransactionType>>
    | Array<TransactionType>
    | Promise<number>;
}
