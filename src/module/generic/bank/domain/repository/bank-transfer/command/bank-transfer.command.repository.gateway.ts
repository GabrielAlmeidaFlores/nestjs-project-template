import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BankTransferEntity } from '@module/generic/bank/domain/schema/entity/bank-transfer/bank-transfer.entity';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export abstract class BankTransferCommandRepositoryGateway {
  public abstract createBankTransfer(
    props: BankTransferEntity,
  ): TransactionType;
  public abstract updateBankTransfer(
    id: BankTransferId,
    props: BankTransferEntity,
  ): TransactionType;
}
