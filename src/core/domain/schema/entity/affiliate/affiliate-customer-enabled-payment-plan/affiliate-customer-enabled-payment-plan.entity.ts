import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AffiliateCustomerEntity } from '@core/domain/schema/entity/affiliate/affiliate-customer/affiliate-customer.entity';
import type { AffiliateCustomerEnabledPaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/affiliate/affiliate-customer-enabled-payment-plan/affiliate-customer-enabled-payment-plan.entity.props.interface';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class AffiliateCustomerEnabledPaymentPlanEntity extends BaseEntity {
  public readonly affiliateCustomer: AffiliateCustomerEntity;
  public readonly availablePaymentPlan: RelationModel<AvailablePaymentPlanEntity>;

  protected readonly _type = AffiliateCustomerEnabledPaymentPlanEntity.name;

  public constructor(
    props: AffiliateCustomerEnabledPaymentPlanEntityPropsInterface,
  ) {
    super(props);

    this.affiliateCustomer = props.affiliateCustomer;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
