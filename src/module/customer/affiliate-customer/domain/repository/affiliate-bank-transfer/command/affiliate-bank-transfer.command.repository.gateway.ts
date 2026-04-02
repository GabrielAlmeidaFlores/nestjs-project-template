import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AffiliateBankTransferEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity';

export abstract class AffiliateBankTransferCommandRepositoryGateway {
  public abstract createAffiliateBankTransfer(
    props: AffiliateBankTransferEntity,
  ): TransactionType;
}
