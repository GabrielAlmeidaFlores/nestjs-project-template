import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCreditPurchaseEntityPropsInterface } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity.props.interface';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export class OrganizationCreditPurchaseEntity extends BaseEntity<OrganizationCreditPurchaseId> {
  @Description('Identificador da organização')
  public readonly organization: OrganizationId;

  @Description('Identificador da transação de pagamento bancário')
  public readonly bankPayment: BankPaymentId;

  @Description('Quantidade de crédito adquirida')
  public readonly creditAmount: number;

  protected readonly _type = OrganizationCreditPurchaseEntity.name;

  public constructor(props: OrganizationCreditPurchaseEntityPropsInterface) {
    super(OrganizationCreditPurchaseId, props);

    this.organization = props.organization;
    this.bankPayment = props.bankPayment;
    this.creditAmount = props.creditAmount;
  }
}
