import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'available_payment_plan' })
export class AvailablePaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 50 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'price', type: 'decimal' })
  public price: string;

  @Column({ name: 'max_member_limit', type: 'int' })
  public maxMemberLimit: number;

  @Column({ name: 'monthly_credit_amount', type: 'int' })
  public monthlyCreditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @Column({ name: 'cycle', type: 'simple-enum', enum: PaymentPlanCycleEnum })
  public cycle: PaymentPlanCycleEnum;

  @OneToMany(
    () => AvailablePaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.availablePaymentPlan,
  )
  public availablePaymentPlanEnabledPaidResource:
    | AvailablePaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  @ManyToOne(
    () => AffiliateCustomerTypeormEntity,
    (entity) => entity.availablePaymentPlan,
  )
  @JoinColumn({ name: 'affiliate_customer_id' })
  public affiliateCustomer: AffiliateCustomerTypeormEntity | undefined;

  protected override readonly _type = AvailablePaymentPlanTypeormEntity.name;
}
