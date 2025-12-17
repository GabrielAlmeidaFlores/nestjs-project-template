import type { NotFound } from '@aws-sdk/client-s3';
import type { GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/result/get-payment-plan-paid-resource-ia-config-with-relations.query.results';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import type { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class PaymentPlanPaidResourceIaConfigQueryRepositoryGateway {
  public abstract findOnePaymentPlanPaidResourceIaConfigByIdOrFail(
    id: PaymentPlanPaidResourceIaConfigId,
    err: Constructor<NotFound>,
  ): Promise<GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult>;

  public abstract findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
    paidResourceId: PaymentPlanPaidResourceId,
  ): Promise<GetPaymentPlanPaidResourceIaConfigWithRelationsQueryResult | null>;
}
