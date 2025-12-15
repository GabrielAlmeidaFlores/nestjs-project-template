import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export abstract class PaymentPlanPaidResourceCommandRepositoryGateway {
  public abstract createPaymentPlanPaidResource(
    props: PaymentPlanPaidResourceEntity,
  ): TransactionType;

  public abstract updatePaymentPlanPaidResource(
    id: PaymentPlanPaidResourceId,
    props: PaymentPlanPaidResourceEntity,
  ): TransactionType;
}
