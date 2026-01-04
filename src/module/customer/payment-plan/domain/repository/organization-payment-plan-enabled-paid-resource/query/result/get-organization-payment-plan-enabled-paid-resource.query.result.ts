import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetPaymentPlanPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/result/get-payment-plan-paid-resource.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/value-object/organization-payment-plan-enabled-paid-resource-id/organization-payment-plan-enabled-paid-resource-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class GetOrganizationPaymentPlanEnabledPaidResourceQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationPaymentPlanEnabledPaidResourceId;
  public readonly organizationPaymentPlanId: OrganizationPaymentPlanId;
  public readonly paymentPlanPaidResourceId: PaymentPlanPaidResourceId;
  public readonly paymentPlanPaidResource: GetPaymentPlanPaidResourceQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetOrganizationPaymentPlanEnabledPaidResourceQueryResult.name;
}
