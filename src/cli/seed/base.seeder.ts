import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export abstract class BaseSeeder {
  protected abstract readonly _type: string;

  public abstract execute():
    | Promise<Array<TransactionType>>
    | Array<TransactionType>
    | Promise<number>;
}
