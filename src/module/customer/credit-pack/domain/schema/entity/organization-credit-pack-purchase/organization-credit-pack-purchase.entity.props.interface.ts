import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import type { OrganizationCreditPackPurchaseId } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/value-object/organization-credit-pack-purchase-id/organization-credit-pack-purchase-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export interface OrganizationCreditPackPurchaseEntityPropsInterface extends BaseEntityPropsInterface<OrganizationCreditPackPurchaseId> {
  organizationId: OrganizationId;
  creditPackId: CreditPackId;
  creditAmount: number;
  price: DecimalValue;
  bankPaymentId: BankPaymentId;
}
