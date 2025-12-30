import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceIaConfigEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia-config.entity.props.interface';
import { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

export class PaymentPlanPaidResourceIaConfigEntity extends BaseEntity<PaymentPlanPaidResourceIaConfigId> {
  @Description('Prompt configurado para o recurso pago de IA')
  public readonly prompt: string;

  @Description('Recurso pago de IA vinculado à configuração')
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceEntity;

  protected readonly _type = PaymentPlanPaidResourceIaConfigEntity.name;

  public constructor(
    props: PaymentPlanPaidResourceIaConfigEntityPropsInterface,
  ) {
    super(PaymentPlanPaidResourceIaConfigId, props);

    this.prompt = props.prompt;
    this.paymentPlanPaidResource = props.paymentPlanPaidResource;
  }
}
