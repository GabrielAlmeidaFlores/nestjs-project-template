import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export interface AffiliateDiscountResultInterface {
  percentage: number;
  commissionPercentage: number;
  affiliateCustomerId: AffiliateCustomerId;
}

export interface AffiliateDiscountContextInterface {
  percentage: number;
  linkedPlanIds: Set<string>;
}

export abstract class ResolveAffiliatePlanDiscountGateway {
  public abstract resolveDiscount(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
  ): Promise<AffiliateDiscountResultInterface | null>;

  public abstract resolveDiscountContext(
    affiliateCustomerIdStr: string | null | undefined,
  ): Promise<AffiliateDiscountContextInterface | null>;
}
