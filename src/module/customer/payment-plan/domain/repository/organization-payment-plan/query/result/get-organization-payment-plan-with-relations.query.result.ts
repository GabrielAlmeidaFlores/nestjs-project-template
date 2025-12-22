import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { GetPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan/query/result/get-payment-plan.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetOrganizationPaymentPlanWithRelationsQueryResult extends BaseBuildableObject {
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
  public organization: GetOrganizationQueryResult;
  public paymentPlan: GetPaymentPlanQueryResult;

  protected override readonly _type =
    GetOrganizationPaymentPlanWithRelationsQueryResult.name;
}
