import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';
import { PaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan.typeorm.entity';

@Entity('organization_payment_plan_enable_paid_resource')
export class OrganizationPaymentPlanEnablePaidResourceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => PaymentPlanTypeormEntity,
    (entity) => entity.organizationPaymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'payment_plan_id' })
  public paymentPlan: PaymentPlanTypeormEntity | null;

  @ManyToOne(
    () => PaymentPlanPaidResourceTypeormEntity,
    (entity) => entity.organizationPaymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'payment_plan_paid_resource_id' })
  public paymentPlanPaidResource: PaymentPlanPaidResourceTypeormEntity | null;

  protected override readonly _type =
    OrganizationPaymentPlanEnablePaidResourceTypeormEntity.name;
}
