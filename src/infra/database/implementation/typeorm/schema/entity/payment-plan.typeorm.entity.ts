import { Column, Entity, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan-enabled-paid-resource.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { PaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-enabled-paid-resource.typeorm.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

@Entity({ name: 'payment_plan' })
export class PaymentPlanTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 100 })
  public name: string;

  @Column({ name: 'description', type: 'varchar', length: 255 })
  public description: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  public price: string;

  @Column({ name: 'max_member_count', type: 'integer' })
  public maxMemberCount: number;

  @Column({ name: 'monthly_credit_amount', type: 'integer' })
  public monthlyCreditAmount: number;

  @Column({ name: 'active', type: 'boolean' })
  public active: boolean;

  @Column({ name: 'cycle', type: 'varchar', length: 100 })
  public cycle: PaymentPlanCycleEnum;

  @Column({ name: 'highlight', type: 'varchar', length: 255, nullable: true })
  public highlight: string | null;

  @OneToMany(
    () => OrganizationPaymentPlanTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public organizationPaymentPlan?:
    | OrganizationPaymentPlanTypeormEntity[]
    | undefined;

  @OneToMany(
    () => PaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public paymentPlanEnabledPaidResource?:
    | PaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  @OneToMany(
    () => OrganizationPaymentPlanEnabledPaidResourceTypeormEntity,
    (entity) => entity.paymentPlan,
  )
  public organizationPaymentPlanEnabledPaidResource?:
    | OrganizationPaymentPlanEnabledPaidResourceTypeormEntity[]
    | undefined;

  protected override readonly _type = PaymentPlanTypeormEntity.name;
}
