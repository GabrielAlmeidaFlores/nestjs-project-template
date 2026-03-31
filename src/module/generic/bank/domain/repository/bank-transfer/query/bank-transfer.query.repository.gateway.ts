import type { GetBankTransferQueryResult } from '@module/generic/bank/domain/repository/bank-transfer/query/result/get-bank-transfer.query.result';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export abstract class BankTransferQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: BankTransferId,
  ): Promise<GetBankTransferQueryResult>;

  public abstract findOneById(
    id: BankTransferId,
  ): Promise<GetBankTransferQueryResult | null>;

  public abstract findOneByBankExternalId(
    bankExternalId: string,
  ): Promise<GetBankTransferQueryResult | null>;

  public abstract findManyByIds(
    ids: BankTransferId[],
  ): Promise<GetBankTransferQueryResult[]>;
}
