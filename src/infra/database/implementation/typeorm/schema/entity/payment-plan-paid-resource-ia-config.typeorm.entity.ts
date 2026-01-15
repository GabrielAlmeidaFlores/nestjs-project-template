import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PaymentPlanPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/payment-plan-paid-resource.typeorm.entity';

@Entity({ name: 'payment_plan_paid_resource_ia_config' })
export class PaymentPlanPaidResourceIaConfigTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'prompt', type: 'longtext' })
  public prompt: string;

  @OneToOne(
    () => PaymentPlanPaidResourceTypeormEntity,
    (entity) => entity.paymentPlanPaidResourceIaConfig,
  )
  @JoinColumn({ name: 'payment_plan_paid_resource_id' })
  public paymentPlanPaidResource: PaymentPlanPaidResourceTypeormEntity | null;

  protected override readonly _type =
    PaymentPlanPaidResourceIaConfigTypeormEntity.name;
}
