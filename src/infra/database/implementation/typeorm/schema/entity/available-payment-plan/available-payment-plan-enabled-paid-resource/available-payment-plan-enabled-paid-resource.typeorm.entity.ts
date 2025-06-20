import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-resource/application-paid-resource/application-paid-resource.typeorm.entity';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.typeorm.entity';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.typeorm.entity.props.interface';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity';

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

  // ------------------------------------------- FAzendo esse de baixo

  @ManyToOne(
    () => AvailablePaymentPlanTypeormEntity,
    (entity) => entity.availablePaymentPlan,
  )
  @JoinColumn({ name: 'available_payment_plan_id' })
  public availablePaymentPlan: AvailablePaymentPlanTypeormEntity[] | undefined;

  // --------------

  protected readonly _type =
    AvailablePaymentPlanEnabledPaidResourceTypeormEntity.name;

  public constructor(
    props?: AvailablePaymentPlanEnabledPaidResourceTypeormEntityPropsInterface,
  ) {
    super(props);

    const isConstructedByOrm = props === undefined;
    if (isConstructedByOrm) {
      return;
    }

    this.applicationPaidResource = props.applicationPaidResource;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
