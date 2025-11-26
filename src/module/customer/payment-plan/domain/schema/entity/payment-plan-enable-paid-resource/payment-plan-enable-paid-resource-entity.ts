import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanEnablePaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity.props.interface';
import { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value.object';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PaymentPlanEnablePaidResourceEntity extends BaseEntity<PaymentPlanEnablePaidResourceId> {
  @Description('')
  public readonly paymentPlan: PaymentPlanEntity | null;

  @Description('')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceEntity | null;

  protected readonly _type = PaymentPlanEnablePaidResourceEntity.name;

  public constructor(props: PaymentPlanEnablePaidResourceEntityPropsInterface) {
    super(PaymentPlanEnablePaidResourceId, props);

    this.paymentPlan = props.paymentPlan ?? null;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource ?? null;
  }
}
