import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import type { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';

export class GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: PaymentPlanPaidResourceIaConfigId;
  public readonly prompt: string;
  public readonly paymentPlanPaidResource: GetPaymentPlanPaidResourceQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult.name;
}
