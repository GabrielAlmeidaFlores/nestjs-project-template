import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PaymentPlanPaidResourceIaConfigEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/payment-plan-paid-resource-ia.entity';
import type { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';

export abstract class PaymentPlanPaidResourceIaConfigCommandRepositoryGateway {
  public abstract createPaymentPlanPaidResourceIaConfig(
    props: PaymentPlanPaidResourceIaConfigEntity,
  ): TransactionType;

  public abstract updatePaymentPlanPaidResourceIaConfig(
    id: PaymentPlanPaidResourceIaConfigId,
    props: PaymentPlanPaidResourceIaConfigEntity,
  ): TransactionType;
}
