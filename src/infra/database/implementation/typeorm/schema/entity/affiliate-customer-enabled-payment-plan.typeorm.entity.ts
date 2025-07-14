import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'affiliate_customer_enabled_payment_plan' })
export class AffiliateCustomerEnabledPaymentPlanTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.affiliateCustomerEnabledPayment,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity | undefined;

  protected override readonly _type =
    AffiliateCustomerEnabledPaymentPlanTypeormEntity.name;
}
