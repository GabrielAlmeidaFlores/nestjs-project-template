import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCustomerQueryResult } from '@module/customer/auth/domain/repository/customer/query/result/get-customer.query.result';
import type { GetOrganizationQueryResult } from '@module/customer/auth/domain/repository/organization/query/result/get-organization.query.result';
import type { OrganizationMemberId } from '@module/customer/auth/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export class GetOrganizationMemberQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationMemberId;
  public readonly organization: GetOrganizationQueryResult;
  public readonly customer: GetCustomerQueryResult;
  public readonly owner: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetOrganizationMemberQueryResult.name;
}
