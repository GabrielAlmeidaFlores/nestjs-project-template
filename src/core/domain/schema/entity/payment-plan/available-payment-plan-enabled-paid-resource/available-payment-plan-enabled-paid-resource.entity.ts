import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/payment-plan/application-paid-resource/application-paid-resource.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/available-payment-plan/available-payment-plan.entity';
import type { AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.entity.props.interface';

export class AvailablePaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource: ApplicationPaidResourceEntity;
  public readonly availablePaymentPlan: AvailablePaymentPlanEntity;

  protected readonly _type = AvailablePaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    this.applicationPaidResource = props.applicationPaidResource;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
