import type { GetOrganizationPaymentPlanEnabledPaidResourceQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/query/result/get-organization-payment-plan-enabled-paid-resource.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

export abstract class OrganizationPaymentPlanEnabledPaidResourceQueryRepositoryGateway {
  public abstract findManyByOrganizationPaymentPlanId(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanEnabledPaidResourceQueryResult[]>;
}
