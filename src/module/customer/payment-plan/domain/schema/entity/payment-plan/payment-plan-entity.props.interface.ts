import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanCycleTypeEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-type.enum';

export interface PaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface<PaymentPlanId> {
  name: string;
  description: string;
  price: DecimalValue;
  maxMemberCount: number;
  monthlyCreditAmount: number;
  active: boolean;
  cycle: PaymentPlanCycleTypeEnum;
}
