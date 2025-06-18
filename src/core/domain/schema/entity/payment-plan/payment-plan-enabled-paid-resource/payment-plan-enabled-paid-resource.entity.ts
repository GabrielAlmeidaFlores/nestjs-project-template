import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';
import type { PaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class PaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource:
    RelationModel<ApplicationPaidResourceEntity>
  public readonly paymentPlan: PaymentPlanEntity;

  protected readonly _type = PaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: PaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    this.applicationPaidResource = props.applicationPaidResource;
    this.paymentPlan = props.paymentPlan;
  }
}
