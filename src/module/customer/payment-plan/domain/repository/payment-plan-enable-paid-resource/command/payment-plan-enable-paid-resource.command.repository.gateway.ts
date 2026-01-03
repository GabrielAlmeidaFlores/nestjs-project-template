import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity';

export abstract class PaymentPlanEnablePaidResourceCommandRepositoryGateway {
  public abstract createPaymentPlanEnablePaidResource(
    props: PaymentPlanEnablePaidResourceEntity,
  ): TransactionType;
}
