import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class BankPaymentCommandRepositoryGateway {
  public abstract createBankPayment(props: BankPaymentEntity): TransactionType;

  public abstract updateBankPayment(
    id: BankPaymentId,
    props: BankPaymentEntity,
  ): TransactionType;

  public abstract deleteBankPayment(id: BankPaymentId): TransactionType;
}
