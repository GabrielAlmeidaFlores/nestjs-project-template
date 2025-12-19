import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export class GetOrganizationCreditPurchaseQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationCreditPurchaseId;
  public readonly organization: OrganizationId;
  public readonly bankPayment: BankPaymentId;
  public readonly creditAmount: number;
  public readonly validFrom: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetOrganizationCreditPurchaseQueryResult.name;
}
