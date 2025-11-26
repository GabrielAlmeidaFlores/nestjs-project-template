import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';

export abstract class OrganizationPaymentPlanCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlan(
    props: OrganizationPaymentPlanEntity,
  ): TransactionType;
}
