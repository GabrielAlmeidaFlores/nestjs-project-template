import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

export interface AffiliateDiscountResultInterface {
  percentage: number;
  commissionPercentage: number;
  affiliateCustomerId: AffiliateCustomerId;
}
