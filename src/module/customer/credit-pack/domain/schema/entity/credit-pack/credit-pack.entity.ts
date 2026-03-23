import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { CreditPackEntityPropsInterface } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/credit-pack.entity.props.interface';

export class CreditPackEntity extends BaseEntity<CreditPackId> {
  public readonly price: DecimalValue;
  public readonly creditAmount: number;
  public readonly active: boolean;

  protected readonly _type = CreditPackEntity.name;

  public constructor(props: CreditPackEntityPropsInterface) {
    super(CreditPackId, props);
    this.price = props.price;
    this.creditAmount = props.creditAmount;
    this.active = props.active;
  }
}
