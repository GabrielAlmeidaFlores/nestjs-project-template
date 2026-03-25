import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ListOrganizationMembersInputModel } from '@module/customer/account/domain/repository/organization-member/query/model/input/list-organization-members.input.model';
import type { GetOrganizationCollaboratorWithStatsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-collaborator-with-stats.query.result';
import type { GetOrganizationMemberCollaboratorQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-collaborator.query.result';
import type { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { ListOrganizationCollaboratorsWithStatsQueryParamType } from '@module/customer/account/domain/repository/organization-member/query/type/input/list-organization-collaborators-with-stats.query.param';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class OrganizationMemberQueryRepositoryGateway {
  public abstract findOneOrganizationMemberById(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerIdAndAuthIdentityId(
    authIdentityId: AuthIdentityId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerIdAndOrganizationId(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null>;

  public abstract findOneByCustomerIdAndOrganizationIdWithRelations(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult | null>;

  public abstract countActiveCollaboratorsByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number>;

  public abstract listOrganizationMembersByOrganizationId(
    organizationId: OrganizationId,
    pagination: ListOrganizationMembersInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationMemberCollaboratorQueryResult>>;

  public abstract findOneOrganizationMemberByIdWithCollaboratorRelations(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetOrganizationMemberCollaboratorQueryResult | null>;

  public abstract findOrganizationIdByOrganizationMemberId(
    organizationMemberId: OrganizationMemberId,
  ): Promise<OrganizationId | null>;

  public abstract listCollaboratorsWithStats(
    param: ListOrganizationCollaboratorsWithStatsQueryParamType,
  ): Promise<
    ListDataOutputModel<GetOrganizationCollaboratorWithStatsQueryResult>
  >;
}
