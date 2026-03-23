import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetOrganizationPaymentPlanQueryResult extends BaseBuildableObject {
  public id: OrganizationPaymentPlanId;
  public bankExternalId: string;
  public name: string;
  public description: string;
  public price: DecimalValue;
  public maxMemberCount: number;
  public monthlyCreditAmount: number;
  public cycle: PaymentPlanCycleEnum;
  public totalInstallments: number | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public canceled: boolean;
  public affiliateCustomerId: AffiliateCustomerId | null;

  protected override readonly _type =
    GetOrganizationPaymentPlanQueryResult.name;
}
