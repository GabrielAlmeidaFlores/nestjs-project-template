import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class GetOrganizationPaymentPlanQueryResult {
  public id: OrganizationPaymentPlanId;
  public bankExternalId: string;
  public name: string;
  public description: string;
  public price: DecimalValue;
  public maxMemberCount: number;
  public monthlyCreditAmount: number;
  public cycle: PaymentPlanCycleEnum;
  public createdAt: Date;
  public updatedAt: Date;

  protected readonly _type = GetOrganizationPaymentPlanQueryResult.name;
}
