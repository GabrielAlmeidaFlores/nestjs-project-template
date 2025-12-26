import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';

export class GetCustomerWithAuthIdentityRelationQueryResult extends BaseBuildableObject {
  public readonly id: CustomerId;
  public readonly name: string;
  public readonly profilePicture: string | null;
  public readonly bankExternalId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly authIdentity: GetAuthIdentityQueryResult;

  protected override readonly _type =
    GetCustomerWithAuthIdentityRelationQueryResult.name;
}
