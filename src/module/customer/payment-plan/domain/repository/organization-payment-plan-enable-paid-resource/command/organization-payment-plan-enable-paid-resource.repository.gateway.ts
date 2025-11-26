import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationPaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource.entity';

export abstract class OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway {
  public abstract createOrganizationPaymentPlanEnablePaidResource(
    props: OrganizationPaymentPlanEnablePaidResourceEntity,
  ): TransactionType;
}
