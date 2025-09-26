import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export class GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationMemberId;
  public readonly owner: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly customer: GetCustomerWithAuthIdentityRelationQueryResult;
  public readonly organization: GetOrganizationQueryResult;

  protected override readonly _type =
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.name;
}
