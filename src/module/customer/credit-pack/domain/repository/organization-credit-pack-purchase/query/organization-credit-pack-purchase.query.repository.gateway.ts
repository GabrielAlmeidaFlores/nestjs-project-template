import type { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export abstract class OrganizationCreditPackPurchaseQueryRepositoryGateway {
  public abstract findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<OrganizationCreditPackPurchaseEntity | null>;
}
