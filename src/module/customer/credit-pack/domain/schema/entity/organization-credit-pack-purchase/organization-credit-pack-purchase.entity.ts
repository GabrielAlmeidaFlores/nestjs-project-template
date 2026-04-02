import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCreditPackPurchaseId } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/value-object/organization-credit-pack-purchase-id/organization-credit-pack-purchase-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import type { OrganizationCreditPackPurchaseEntityPropsInterface } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity.props.interface';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export class OrganizationCreditPackPurchaseEntity extends BaseEntity<OrganizationCreditPackPurchaseId> {
  public readonly organizationId: OrganizationId;
  public readonly creditPackId: CreditPackId;
  public readonly creditAmount: number;
  public readonly price: DecimalValue;
  public readonly bankPaymentId: BankPaymentId;

  protected readonly _type = OrganizationCreditPackPurchaseEntity.name;

  public constructor(
    props: OrganizationCreditPackPurchaseEntityPropsInterface,
  ) {
    super(OrganizationCreditPackPurchaseId, props);
    this.organizationId = props.organizationId;
    this.creditPackId = props.creditPackId;
    this.creditAmount = props.creditAmount;
    this.price = props.price;
    this.bankPaymentId = props.bankPaymentId;
  }
}
