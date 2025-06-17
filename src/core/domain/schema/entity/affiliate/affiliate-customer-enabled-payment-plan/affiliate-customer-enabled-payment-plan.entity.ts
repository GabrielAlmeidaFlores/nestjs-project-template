import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { AffiliateCustomerEnabledPaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer-enabled-payment-plan/affiliate-customer-enabled-payment-plan.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerEnabledPaymentPlanEntity extends BaseEntity {
  public readonly affiliateCustomer: Guid;
  public readonly paymentPlan: Guid;

  protected readonly _type = AffiliateCustomerEnabledPaymentPlanEntity.name;

  public constructor(
    props: AffiliateCustomerEnabledPaymentPlanEntityPropsInterface,
  ) {
    super(props);

    this.affiliateCustomer = props.affiliateCustomer;
    this.paymentPlan = props.paymentPlan;
  }
}
