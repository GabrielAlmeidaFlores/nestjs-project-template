import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class GetPaymentPlanEnabledPaidResourceQueryResult extends BaseBuildableObject {
  public readonly id: PaymentPlanEnabledPaidResourceId;
  public readonly paymentPlanId: PaymentPlanId;
  public readonly paymentPlanPaidResourceId: PaymentPlanPaidResourceId;
  public readonly paymentPlanPaidResource: GetPaymentPlanPaidResourceQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPaymentPlanEnabledPaidResourceQueryResult.name;
}
