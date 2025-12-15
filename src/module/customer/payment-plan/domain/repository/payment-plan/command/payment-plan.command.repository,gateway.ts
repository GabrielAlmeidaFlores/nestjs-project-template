import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export abstract class PaymentPlanCommandRepositoryGateway {
  public abstract createPaymentPlan(props: PaymentPlanEntity): TransactionType;
  public abstract updatePaymentPlan(
    id: PaymentPlanId,
    props: PaymentPlanEntity,
  ): TransactionType;
  public abstract deletePaymentPlan(id: PaymentPlanId): TransactionType;
}
