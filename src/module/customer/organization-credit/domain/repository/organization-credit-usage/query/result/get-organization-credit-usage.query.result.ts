import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { OrganizationCreditUsageId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/value-object/organization-credit-usage-id/organization-credit-usage-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export class GetOrganizationCreditUsageQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationCreditUsageId;
  public readonly creditAmount: number;
  public readonly paymentPlanPaidResource: PaymentPlanPaidResourceId;
  public readonly createdBy: OrganizationMemberId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetOrganizationCreditUsageQueryResult.name;
}
