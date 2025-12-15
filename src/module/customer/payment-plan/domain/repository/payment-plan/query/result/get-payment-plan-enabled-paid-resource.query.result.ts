import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export interface GetPaymentPlanEnabledPaidResourceQueryResultInterface {
  id: PaymentPlanPaidResourceId;
  resource: PaymentPlanPaidResourceTypeEnum;
  creditCost: string;
  description: string;
}

export type GetPaymentPlanEnabledPaidResourceQueryResultType =
  GetPaymentPlanEnabledPaidResourceQueryResultInterface;
