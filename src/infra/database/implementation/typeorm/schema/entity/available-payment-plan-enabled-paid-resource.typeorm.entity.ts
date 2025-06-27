import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'available_payment_plan_enable_paid_resource' })
export class AvailablePaymentPlanEnabledPaidResourceTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(
    () => ApplicationPaidResourceTypeormEntity,
    (entity) => entity.applicationPaidResource,
  )
  @JoinColumn({ name: 'application_paid_resource_id' })
  public applicationPaidResource:
    | ApplicationPaidResourceTypeormEntity[]
    | undefined;

  @ManyToOne(
    () => AvailablePaymentPlanTypeormEntity,
    (entity) => entity.availablePaymentPlanEnabledPaidResource,
  )
  @JoinColumn({ name: 'available_payment_plan_id' })
  public availablePaymentPlan: AvailablePaymentPlanTypeormEntity[] | undefined;

  protected override readonly _type =
    AvailablePaymentPlanEnabledPaidResourceTypeormEntity.name;
}
