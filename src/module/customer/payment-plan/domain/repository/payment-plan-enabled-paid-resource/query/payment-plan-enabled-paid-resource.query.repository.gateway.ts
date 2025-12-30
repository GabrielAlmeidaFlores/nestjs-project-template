import type { GetPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/result/get-payment-plan-enabled-paid-resource.query.result';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export abstract class PaymentPlanEnabledPaidResourceQueryRepositoryGateway {
  public abstract findManyByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanEnabledPaidResourceQueryResult[]>;
}
