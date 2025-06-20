import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import type { AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan-enabled-paid-resource/available-payment-plan-enabled-paid-resource.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class AvailablePaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  public readonly availablePaymentPlan: AvailablePaymentPlanEntity;

  protected readonly _type = AvailablePaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    this.applicationPaidResource = props.applicationPaidResource;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
