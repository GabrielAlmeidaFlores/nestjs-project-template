import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class GetPaymentPlanPaidResourceQueryResult extends BaseBuildableObject {
  public readonly id: PaymentPlanPaidResourceId;
  public readonly resource: PaymentPlanPaidResourceTypeEnum;
  public readonly creditCost: number;
  public readonly title: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetPaymentPlanPaidResourceQueryResult.name;
}
