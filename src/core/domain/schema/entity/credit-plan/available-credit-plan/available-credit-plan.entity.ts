import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { AvailableCreditPlanEntityPropsInterface } from '@core/domain/schema/entity/credit-plan/available-credit-plan/available-credit-plan.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class AvailableCreditPlanEntity extends BaseEntity {
  public readonly price: DecimalValue;
  public readonly creditAmount: number;
  public readonly active: boolean;

  protected readonly _type = AvailableCreditPlanEntity.name;

  public constructor(props: AvailableCreditPlanEntityPropsInterface) {
    super(props);

    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
  }
}
