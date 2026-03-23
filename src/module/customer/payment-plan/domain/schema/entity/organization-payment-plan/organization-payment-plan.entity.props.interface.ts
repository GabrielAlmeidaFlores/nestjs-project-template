import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export interface OrganizationPaymentPlanEntityPropsInterface extends BaseEntityPropsInterface<OrganizationPaymentPlanId> {
  name: string;
  description: string;
  price: DecimalValue;
  maxMemberCount: number;
  monthlyCreditAmount: number;
  bankExternalId: string;
  cycle: PaymentPlanCycleEnum;
  totalInstallments?: number | null;
  organization: OrganizationId;
  paymentPlan: PaymentPlanId;
  canceled: boolean;
  affiliateCustomerId?: AffiliateCustomerId | null;
}
