import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan/payment-plan-cycle.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface AvailablePaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface,
    BaseEntityPropsInterface {
  name: string;
  description: string;
  price: DecimalValue;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  active: boolean;
  cycle: PaymentPlanCycleEnum;
}
