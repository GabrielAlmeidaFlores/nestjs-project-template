import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class GetPaymentPlanEnablePaidResourceQueryResult extends BaseBuildableObject {
  public readonly id: PaymentPlanEnablePaidResourceId;
  public readonly paymentPlanId: PaymentPlanId;
  public readonly paymentPlanPaidResourceId: PaymentPlanPaidResourceId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPaymentPlanEnablePaidResourceQueryResult.name;
}
