import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';

export interface AffiliateCustomerEntityPropsInterface extends BaseEntityPropsInterface<AffiliateCustomerId> {
  customerId: CustomerId;
  pixAddressKey?: PixAddressKey | null;
  pixAddressKeyType?: PixAddressKeyTypeEnum | null;
  paymentCommissionPercentage: number;
  paymentPlanDiscountPercentage: number;
  paymentPlanDiscountValidUntil: Date;
  paymentPlanDiscountRedemptionLimit: number;
  isActive?: boolean;
}
