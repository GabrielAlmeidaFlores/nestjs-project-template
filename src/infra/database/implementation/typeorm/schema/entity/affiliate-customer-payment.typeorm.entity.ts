import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'affiliate_customer_payment' })
export class AffiliateCustomerPaymentTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.affiliateCustomerPayment,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity;

  protected override readonly _type =
    AffiliateCustomerPaymentTypeormEntity.name;
}
