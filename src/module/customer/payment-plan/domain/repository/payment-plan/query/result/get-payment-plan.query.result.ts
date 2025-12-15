import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetPaymentPlanQueryResult {
  public id: PaymentPlanId;
  public name: string;
  public description: string;
  public price: DecimalValue;
  public maxMemberCount: number;
  public monthlyCreditAmount: number;
  public active: boolean;
  public cycle: PaymentPlanCycleEnum;
  public createdAt: Date;
  public updatedAt: Date;

  protected readonly _type = GetPaymentPlanQueryResult.name;
}
