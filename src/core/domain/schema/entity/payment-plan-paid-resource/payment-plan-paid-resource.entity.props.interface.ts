import type { PaidResourceEnum } from '@core/domain/schema/entity/payment-plan-paid-resource/enum/paid-resource.enum';

export interface PaymentPlanPaidResourceEntityPropsInterface {
  resource: PaidResourceEnum;
  creditCost: number;
  description: string;
}
