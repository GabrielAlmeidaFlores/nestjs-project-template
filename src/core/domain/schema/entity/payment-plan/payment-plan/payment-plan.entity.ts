import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { PaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';

export class PaymentPlanEntity extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly maxMemberLimit: number;
  public readonly monthlyCreditAmount: number;
  public readonly active: boolean;
  public readonly cycle: PaymentPlanCycleEnum;

  protected readonly _type = PaymentPlanEntity.name;

  public constructor(props: PaymentPlanEntityPropsInterface) {
    super(props);

    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.maxMemberLimit = props.maxMemberLimit;
    this.monthlyCreditAmount = props.monthlyCreditAmount;
    this.active = props.active;
    this.cycle = props.cycle;
  }
}
