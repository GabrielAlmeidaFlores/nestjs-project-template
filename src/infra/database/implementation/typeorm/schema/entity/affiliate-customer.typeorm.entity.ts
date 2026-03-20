import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AffiliateCustomerPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer-payment-plan.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';

@Entity({ name: 'affiliate_customer' })
export class AffiliateCustomerTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerTypeormEntity)
  @JoinColumn({ name: 'customer_id' })
  public customer: CustomerTypeormEntity | null;

  @Column({
    name: 'pix_address_key',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public pixAddressKey: string | null;

  @Column({
    name: 'pix_address_key_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public pixAddressKeyType: PixAddressKeyTypeEnum | null;

  @Column({ name: 'payment_commission_percentage', type: 'integer' })
  public paymentCommissionPercentage: number;

  @Column({ name: 'payment_plan_discount_percentage', type: 'integer' })
  public paymentPlanDiscountPercentage: number;

  @Column({
    name: 'payment_plan_discount_valid_until',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public paymentPlanDiscountValidUntil: Date;

  @Column({ name: 'payment_plan_discount_redemption_limit', type: 'integer' })
  public paymentPlanDiscountRedemptionLimit: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public isActive: boolean;

  @OneToMany(
    () => AffiliateCustomerPaymentPlanTypeormEntity,
    (entity) => entity.affiliateCustomer,
  )
  public affiliateCustomerPaymentPlan?: AffiliateCustomerPaymentPlanTypeormEntity[];

  protected override readonly _type = AffiliateCustomerTypeormEntity.name;
}
