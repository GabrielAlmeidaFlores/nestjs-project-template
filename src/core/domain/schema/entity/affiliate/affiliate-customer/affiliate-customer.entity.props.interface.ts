import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface AffiliateCustomerEntityPropsInterface
  extends BaseEntityPropsInterface {
  customerId: Guid;
  pixAdressKey: string | null;
  pixAdressKeyType: string | null;
  paymentCommissionPercentage: number;
  paymentPlanDiscountPercentage: number;
  paymentPlanDiscountValidUntil: Date;
  paymentPlanDiscountRedemptionLimit: number;
}
