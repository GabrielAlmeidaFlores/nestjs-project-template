import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';

@Entity({ name: 'affiliate_customer_payment_plan' })
export class AffiliateCustomerPaymentPlanTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.affiliateCustomerPaymentPlan,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity | null;

  @ManyToOne(() => PaymentPlanTypeormEntity)
  @JoinColumn({ name: 'payment_plan_id' })
  public paymentPlan: PaymentPlanTypeormEntity | null;

  protected override readonly _type =
    AffiliateCustomerPaymentPlanTypeormEntity.name;
}
