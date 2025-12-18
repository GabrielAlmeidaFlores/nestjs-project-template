import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GetPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/result/get-payment-plan-enabled-paid-resource.query.result';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetPaymentPlanQueryResult extends BaseBuildableObject {
  public id: PaymentPlanId;
  public name: string;
  public description: string;
  public price: DecimalValue;
  public maxMemberCount: number;
  public monthlyCreditAmount: number;
  public active: boolean;
  public cycle: PaymentPlanCycleEnum;
  public highlight: string | null;
  public enabledPaidResources: GetPaymentPlanEnabledPaidResourceQueryResult[];
  public createdAt: Date;
  public updatedAt: Date;

  protected override readonly _type = GetPaymentPlanQueryResult.name;
}
