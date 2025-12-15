import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export interface OrganizationPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface<OrganizationPaymentPlanId> {
  name: string;
  description: string;
  price: DecimalValue;
  maxMemberCount: number;
  monthlyCreditAmount: number;
  active: boolean;
  cycle: PaymentPlanCycleEnum;
  organization?: OrganizationEntity | null;
  paymentPlan?: PaymentPlanEntity | null;
}
