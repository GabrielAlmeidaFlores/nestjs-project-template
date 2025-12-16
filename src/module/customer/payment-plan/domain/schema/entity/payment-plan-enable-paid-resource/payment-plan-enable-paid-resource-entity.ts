import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PaymentPlanEnablePaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity.props.interface';
import { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class PaymentPlanEnablePaidResourceEntity extends BaseEntity<PaymentPlanEnablePaidResourceId> {
  @Description('Identificador do plano de pagamento')
  public readonly paymentPlan: PaymentPlanId;

  @Description('Identificador do recurso pago habilitado')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;

  protected readonly _type = PaymentPlanEnablePaidResourceEntity.name;

  public constructor(props: PaymentPlanEnablePaidResourceEntityPropsInterface) {
    super(PaymentPlanEnablePaidResourceId, props);

    this.paymentPlan = props.paymentPlan;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
  }
}
