import type { GetPaymentPlanEnablePaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/query/result/get-payment-plan-enable-paid-resource.query.result';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export abstract class PaymentPlanEnablePaidResourceQueryRepositoryGateway {
  public abstract findManyByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanEnablePaidResourceQueryResult[]>;
}
