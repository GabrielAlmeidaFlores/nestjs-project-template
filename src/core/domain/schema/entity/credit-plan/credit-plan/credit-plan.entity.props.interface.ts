import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface CreditPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  price: string;
  creditAmount: number;
  active: boolean;
}
