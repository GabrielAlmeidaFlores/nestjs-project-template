import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationPaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-payment-plan.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';

@Entity('organization_payment_plan_enable_paid_resource')
export class OrganizationPaymentPlanEnabledPaidResourceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => OrganizationPaymentPlanTypeormEntity,
    (entity) => entity.organizationPaymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'organization_payment_plan_id' })
  public organizationPaymentPlan: OrganizationPaymentPlanTypeormEntity | null;

  @ManyToOne(
    () => PaymentPlanPaidResourceTypeormEntity,
    (entity) => entity.organizationPaymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'payment_plan_paid_resource_id' })
  public paymentPlanPaidResource: PaymentPlanPaidResourceTypeormEntity | null;

  protected override readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceTypeormEntity.name;
}
