import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface AffiliateCustomerEntityPropsInterface
  extends BaseEntityPropsInterface {
  customer: RelationModel<CustomerEntity>;
  pixAddressKey?: string | null;
  pixAddressKeyType?: string | null;
  paymentCommissionPercentage: number;
  paymentPlanDiscountPercentage: number;
  paymentPlanDiscountValidUntil: Date;
  paymentPlanDiscountRedemptionLimit: number;
}
