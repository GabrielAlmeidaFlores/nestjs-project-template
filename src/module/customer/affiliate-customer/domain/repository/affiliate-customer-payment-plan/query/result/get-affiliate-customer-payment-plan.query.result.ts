import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class GetAffiliateCustomerPaymentPlanQueryResult extends BaseBuildableObject {
  public readonly id: AffiliateCustomerPaymentPlanId;
  public readonly affiliateCustomerId: AffiliateCustomerId;
  public readonly paymentPlanId: PaymentPlanId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAffiliateCustomerPaymentPlanQueryResult.name;
}
