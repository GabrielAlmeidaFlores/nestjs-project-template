import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AvailablePaymentPlanEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/available-payment-plan/available-payment-plan.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/entity/payment-plan/enum/payment-plan-cycle.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class AvailablePaymentPlanEntity extends BaseEntity {
  public readonly name: string;
  public readonly description: string;
  public readonly price: DecimalValue;
  public readonly maxMemberLimit: number;
  public readonly monthlyCreditAmount: number;
  public readonly active: boolean;
  public readonly cycle: PaymentPlanCycleEnum;

  protected readonly _type = AvailablePaymentPlanEntity.name;

  public constructor(props: AvailablePaymentPlanEntityPropsInterface) {
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
