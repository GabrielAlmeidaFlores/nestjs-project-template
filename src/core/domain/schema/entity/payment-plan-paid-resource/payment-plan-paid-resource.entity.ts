import type { PaidResourceEnum } from '@core/domain/schema/entity/payment-plan-paid-resource/enum/paid-resource.enum';
import type { PaymentPlanPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity.props.interface';

export class PaymentPlanPaidResourceEntity {
  public readonly resource: PaidResourceEnum;
  public readonly creditCost: number;
  public readonly description: string;

  protected readonly _type = PaymentPlanPaidResourceEntity.name;

  public constructor(props: PaymentPlanPaidResourceEntityPropsInterface) {
    this.resource = props.resource;
    this.creditCost = props.creditCost;
    this.description = props.description;
  }
}
