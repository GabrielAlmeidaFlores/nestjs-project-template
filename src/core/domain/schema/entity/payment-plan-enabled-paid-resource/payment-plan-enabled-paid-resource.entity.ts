import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.entity.props.interface';
import type { PaymentPlanPaidResourceEntity } from '@core/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

export class PaymentPlanEnabledPaidResourceEntity {
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceEntity;
  public readonly paymentPlan: PaymentPlanEntity;

  protected readonly _type = PaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: PaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
    this.paymentPlan = props.paymentPlan;
  }
}
