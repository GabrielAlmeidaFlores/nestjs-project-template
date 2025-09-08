import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';

export class GetOrganizationMemberQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly organization: GetOrganizationQueryResult;
  public readonly customer: GetCustomerQueryResult;
  public readonly owner: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetOrganizationMemberQueryResult.name;
}
