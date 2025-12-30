import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanBankPaymentId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/value-object/organization-payment-plan-bank-payment-id/organization-payment-plan-bank-payment-id.value-object';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export class GetOrganizationPaymentPlanBankPaymentQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationPaymentPlanBankPaymentId;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanId;
  public readonly bankPayment: BankPaymentId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetOrganizationPaymentPlanBankPaymentQueryResult.name;
}
