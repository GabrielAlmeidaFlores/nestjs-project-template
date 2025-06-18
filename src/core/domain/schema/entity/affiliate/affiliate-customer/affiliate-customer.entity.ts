import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AffiliateCustomerEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class AffiliateCustomerEntity extends BaseEntity {
  public readonly pixAddressKey: string | null;
  public readonly pixAddressKeyType: string | null;
  public readonly paymentCommissionPercentage: number;
  public readonly paymentPlanDiscountPercentage: number;
  public readonly paymentPlanDiscountValidUntil: Date;
  public readonly paymentPlanDiscountRedemptionLimit: number;
  public readonly customer: RelationModel<CustomerEntity>;

  protected readonly _type = AffiliateCustomerEntity.name;

  public constructor(props: AffiliateCustomerEntityPropsInterface) {
    super(props);

    this.customer = props.customer;
    this.pixAddressKey = props.pixAddressKey;
    this.pixAddressKeyType = props.pixAddressKeyType;
    this.paymentCommissionPercentage = props.paymentCommissionPercentage;
    this.paymentPlanDiscountPercentage = props.paymentPlanDiscountPercentage;
    this.paymentPlanDiscountValidUntil = props.paymentPlanDiscountValidUntil;
    this.paymentPlanDiscountRedemptionLimit =
      props.paymentPlanDiscountRedemptionLimit;
  }
}
