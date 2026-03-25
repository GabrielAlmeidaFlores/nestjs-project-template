import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetOrganizationCustomizationQueryResult } from '@module/customer/organization-customization/domain/repository/organization-customization/query/result/get-organization-customization.query.result';
import type { OrganizationCustomizationId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization/value-object/organization-customization-id/organization-customization-id.value-object';

export abstract class OrganizationCustomizationQueryRepositoryGateway {
  public abstract findOneOrganizationCustomizationById(
    id: OrganizationCustomizationId,
  ): Promise<GetOrganizationCustomizationQueryResult | null>;

  public abstract findOneOrganizationCustomizationByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCustomizationQueryResult | null>;
}
