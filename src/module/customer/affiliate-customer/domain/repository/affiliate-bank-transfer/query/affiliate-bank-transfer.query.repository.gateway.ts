import type { GetAffiliateBankTransferQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/result/get-affiliate-bank-transfer.query.result';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class AffiliateBankTransferQueryRepositoryGateway {
  public abstract findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetAffiliateBankTransferQueryResult | null>;
}
