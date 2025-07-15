import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import type { AvailablePaymentPlanEnabledApplicationPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan-enabled-application-paid-resource/available-payment-plan-enabled-application-paid-resource.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class AvailablePaymentPlanEnabledApplicationPaidResourceEntity extends BaseEntity {
  public readonly applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  public readonly availablePaymentPlan: AvailablePaymentPlanEntity;

  protected readonly _type =
    AvailablePaymentPlanEnabledApplicationPaidResourceEntity.name;

  public constructor(
    props: AvailablePaymentPlanEnabledApplicationPaidResourceEntityPropsInterface,
  ) {
    super(props);

    this.applicationPaidResource = props.applicationPaidResource;
    this.availablePaymentPlan = props.availablePaymentPlan;
  }
}
