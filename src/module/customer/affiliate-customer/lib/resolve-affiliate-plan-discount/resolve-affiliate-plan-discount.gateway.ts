import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { AffiliateBillingPriceResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-billing-price-result.interface';
import type { AffiliateDiscountContextInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-discount-context.interface';
import type { AffiliateDiscountResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-discount-result.interface';
import type { AffiliatePriceResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-price-result.interface';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export abstract class ResolveAffiliatePlanDiscountGateway {
  public abstract resolveDiscount(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
  ): Promise<AffiliateDiscountResultInterface | null>;

  public abstract resolveDiscountContext(
    affiliateCustomerIdStr: string | null | undefined,
  ): Promise<AffiliateDiscountContextInterface | null>;

  public abstract applyDiscount(
    planId: string,
    originalPrice: number,
    context: AffiliateDiscountContextInterface | null,
  ): AffiliatePriceResultInterface | null;

  public abstract resolveBillingPrice(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
    originalPrice: DecimalValue,
  ): Promise<AffiliateBillingPriceResultInterface>;
}
