import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { CreditPlanEntityPropsInterface } from '@core/domain/schema/entity/credit-plan/credit-plan/credit-plan.entity.props.interface';

export class CreditPlanEntity extends BaseEntity {
  public readonly price: string;
  public readonly creditAmount: number;
  public readonly active: boolean;

  protected readonly _type = CreditPlanEntity.name;

  public constructor(props: CreditPlanEntityPropsInterface) {
    super(props);

    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
  }
}
