import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export interface OrganizationCreditPurchaseEntityPropsInterface
  extends BaseEntityPropsInterface<OrganizationCreditPurchaseId> {
  organization: OrganizationId;
  bankPayment: BankPaymentId;
  creditAmount: number;
  validFrom?: Date | null;
}
