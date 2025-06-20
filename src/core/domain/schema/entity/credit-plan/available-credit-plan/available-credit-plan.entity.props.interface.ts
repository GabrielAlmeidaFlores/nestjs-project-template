import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface AvailableCreditPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  price: DecimalValue;
  creditAmount: number;
  active: boolean;
}
