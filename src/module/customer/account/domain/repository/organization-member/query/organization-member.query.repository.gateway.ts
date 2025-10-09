import type { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class OrganizationMemberQueryRepositoryGateway {
  public abstract findOneByOrganizationMemberId(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerAndAuthIdentityId(
    authIdentityId: AuthIdentityId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerAndOrganizationId(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerAndOrganizationIdWithRelations(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult | null>;
}
