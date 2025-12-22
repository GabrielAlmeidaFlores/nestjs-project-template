import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';

export abstract class OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlanEnabledPaidResource(
    props: OrganizationPaymentPlanEnabledPaidResourceEntity,
  ): TransactionType;
}
