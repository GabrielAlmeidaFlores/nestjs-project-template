import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';

@Entity({ name: 'payment_plan_enable_resource' })
export class PaymentPlanEnabledPaidResourceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => PaymentPlanTypeormEntity,
    (entity) => entity.paymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'payment_plan_id' })
  public paymentPlan: PaymentPlanTypeormEntity | null;

  @ManyToOne(
    () => PaymentPlanPaidResourceTypeormEntity,
    (entity) => entity.paymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'payment_plan_paid_resource_id' })
  public paymentPlanPaidResource: PaymentPlanPaidResourceTypeormEntity | null;

  protected override readonly _type =
    PaymentPlanEnabledPaidResourceTypeormEntity.name;
}
