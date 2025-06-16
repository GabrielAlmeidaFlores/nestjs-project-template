import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PaymentPlanCycleEnum } from '@core/domain/schema/enum/payment-plan-cycle.enum';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface OrganizationPaymentPlanEntityPropsInterface
  extends BaseEntityPropsInterface {
  name: string;
  description: string;
  price: number;
  maxMemberLimit: number;
  monthlyCreditAmount: number;
  cycle: PaymentPlanCycleEnum;
  paymentPlan: Guid;
  organization: Guid;
}
