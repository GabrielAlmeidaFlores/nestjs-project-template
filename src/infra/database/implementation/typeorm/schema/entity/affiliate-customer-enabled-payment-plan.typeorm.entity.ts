import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AffiliateCustomerPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment.typeorm.entity';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base.typeorm.entity';

@Entity({ name: 'affiliate_customer_enabled_payment_plan' })
export class AffiliateCustomerEnabledPaymentPlanTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.affiliateCustomerEnabledPayment,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity | undefined;

  @ManyToOne(
    () => AffiliateCustomerPaymentTypeormEntity,
    (entity) => entity.affiliateCustomerEnabledPaymentPlan,
  )
  @JoinColumn({ name: 'affiliate_customer_payment_id' })
  public affiliateCustomerPayment: AffiliateCustomerPaymentTypeormEntity;

  protected override readonly _type =
    AffiliateCustomerEnabledPaymentPlanTypeormEntity.name;
}
