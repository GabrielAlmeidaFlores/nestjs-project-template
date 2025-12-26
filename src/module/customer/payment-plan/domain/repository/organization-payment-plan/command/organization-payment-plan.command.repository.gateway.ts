import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

export abstract class OrganizationPaymentPlanCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlan(
    props: OrganizationPaymentPlanEntity,
  ): TransactionType;

  public abstract deleteOrganizationPaymentPlan(
    id: OrganizationPaymentPlanId,
  ): TransactionType;
}
