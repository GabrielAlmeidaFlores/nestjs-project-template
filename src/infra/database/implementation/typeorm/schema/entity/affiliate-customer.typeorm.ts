import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { AffiliateCustomerEnabledPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-enabled-payment-plan.typeorm.entity';
import { AffiliateCustomerPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment.typeorm.entity';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
@Entity({ name: 'affiliate_customer' })
export class AffiliateCustomerTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'pix_address_key',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public pixAddressKey: string | null;

  @Column({
    name: 'pix_address_key_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public pixAddressKeyType: string | null;

  @Column({
    name: 'payment_commission_percentage',
    type: 'int',
  })
  public paymentCommissionPercentage: number;

  @Column({
    name: 'payment_plan_discount_percentage',
    type: 'int',
  })
  public paymentPlanDiscountPercentage: number;

  @Column({
    name: 'payment_plan_discount_valid_until',
    type: 'date',
  })
  public paymentPlanDiscountValidUntil: Date;

  @Column({
    name: 'payment_plan_discount_redemption_limit',
    type: 'int',
  })
  public paymentPlanDiscountRedemptionLimit: number;

  @OneToMany(
    () => AffiliateCustomerEnabledPaymentPlanTypeormEntity,
    (entity) => entity.affiliateCustomer,
  )
  public affiliateCustomerEnabledPayment:
    | AffiliateCustomerEnabledPaymentPlanTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AffiliateCustomerPaymentTypeormEntity,
    (entity) => entity.affiliateCustomer,
  )
  public affiliateCustomerPayment:
    | AffiliateCustomerPaymentTypeormEntity[]
    | undefined;

  @ManyToOne(() => CustomerTypeormEntity, (entity) => entity.affiliateCustomer)
  @JoinColumn({ name: 'customer_id' })
  public customer: CustomerTypeormEntity | undefined;

  @OneToMany(
    () => AvailablePaymentPlanTypeormEntity,
    (entity) => entity.affiliateCustomer,
  )
  public availablePaymentPlan: AvailablePaymentPlanTypeormEntity[] | undefined;

  protected override readonly _type = AffiliateCustomerTypeormEntity.name;
}
