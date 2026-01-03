import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class GetCustomerQueryResult extends BaseBuildableObject {
  public readonly id: CustomerId;
  public readonly name: string;
  public readonly profilePicture: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly bankExternalId: string;

  protected override readonly _type = GetCustomerQueryResult.name;
}
