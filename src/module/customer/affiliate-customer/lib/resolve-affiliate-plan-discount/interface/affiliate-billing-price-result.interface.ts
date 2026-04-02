import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { AffiliateDiscountResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-discount-result.interface';

export interface AffiliateBillingPriceResultInterface {
  billingPrice: DecimalValue;
  discountResult: AffiliateDiscountResultInterface | null;
}
