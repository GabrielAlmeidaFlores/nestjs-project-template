import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';

export abstract class PaymentPlanEnabledPaidResourceCommandRepositoryGateway {
  public abstract createPaymentPlanEnabledPaidResource(
    props: PaymentPlanEnabledPaidResourceEntity,
  ): TransactionType;

  public abstract deleteAllByPaymentPlanId(
    paymentPlanId: PaymentPlanId,
  ): TransactionType;
}
