import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PaymentPlanEnabledPaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity.props.interface';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class PaymentPlanEnabledPaidResourceEntity extends BaseEntity<PaymentPlanEnabledPaidResourceId> {
  @Description('Identificador do plano de pagamento')
  public readonly paymentPlan: PaymentPlanId;

  @Description('Identificador do recurso pago habilitado')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;

  protected readonly _type = PaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: PaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    super(PaymentPlanEnabledPaidResourceId, props);

    this.paymentPlan = props.paymentPlan;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
  }
}
