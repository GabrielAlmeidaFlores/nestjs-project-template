import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';

export interface CreditPackEntityPropsInterface extends BaseEntityPropsInterface<CreditPackId> {
  price: DecimalValue;
  creditAmount: number;
  active: boolean;
}
