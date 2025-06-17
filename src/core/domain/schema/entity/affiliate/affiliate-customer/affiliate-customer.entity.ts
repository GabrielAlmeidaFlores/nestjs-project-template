import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { AffiliateCustomerEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerEntity extends BaseEntity {
  public readonly customerId: Guid;
  public readonly pixAdressKey: string | null;
  public readonly pixAdressKeyType: string | null;
  public readonly paymentCommissionPercentage: number;
  public readonly paymentPlanDiscountPercentage: number;
  public readonly paymentPlanDiscountValidUntil: Date;
  public readonly paymentPlanDiscountRedemptionLimit: number;

  protected readonly _type = AffiliateCustomerEntity.name;

  public constructor(props: AffiliateCustomerEntityPropsInterface) {
    super(props);

    this.customerId = props.customerId;
    this.pixAdressKey = props.pixAdressKey;
    this.pixAdressKeyType = props.pixAdressKeyType;
    this.paymentCommissionPercentage = props.paymentCommissionPercentage;
    this.paymentPlanDiscountPercentage = props.paymentPlanDiscountPercentage;
    this.paymentPlanDiscountValidUntil = props.paymentPlanDiscountValidUntil;
    this.paymentPlanDiscountRedemptionLimit =
      props.paymentPlanDiscountRedemptionLimit;
  }
}
