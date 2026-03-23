import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AffiliateCustomerPaymentPlanEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity';
import type { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';

export abstract class AffiliateCustomerPaymentPlanCommandRepositoryGateway {
  public abstract createAffiliateCustomerPaymentPlan(
    props: AffiliateCustomerPaymentPlanEntity,
  ): TransactionType;

  public abstract deleteAffiliateCustomerPaymentPlan(
    id: AffiliateCustomerPaymentPlanId,
  ): TransactionType;
}
