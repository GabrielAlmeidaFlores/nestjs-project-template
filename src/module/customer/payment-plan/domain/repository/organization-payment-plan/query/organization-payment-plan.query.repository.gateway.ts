import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetOrganizationPaymentPlanQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan.query.result';

export abstract class OrganizationPaymentPlanQueryRepositoryGateway {
  public abstract findManyByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationPaymentPlanQueryResult[]>;
}
