import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PaymentPlanPaidResourceEntityPropsInterface } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity.props.interface';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value.object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

export class PaymentPlanPaidResourceEntity extends BaseEntity<PaymentPlanPaidResourceId> {
  @Description('Recursos disponiveis')
  public readonly resource: PaymentPlanPaidResourceTypeEnum;

  @Description('Quantidade de credito para compra')
  public readonly creditCost: number;

  @Description('Descrição sobre o recurso disponível')
  public readonly description: string;

  protected readonly _type = PaymentPlanPaidResourceEntity.name;

  public constructor(props: PaymentPlanPaidResourceEntityPropsInterface) {
    super(PaymentPlanPaidResourceId, props);

    this.resource = props.resource;
    this.creditCost = props.creditCost;
    this.description = props.description;
  }
}
