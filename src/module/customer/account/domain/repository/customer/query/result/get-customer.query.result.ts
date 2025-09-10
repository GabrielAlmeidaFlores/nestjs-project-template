import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class GetCustomerQueryResult extends BaseBuildableObject {
  public readonly id: CustomerId;
  public readonly name: string;
  public readonly phoneNumber: PhoneNumber;
  public readonly profilePicture: string | null;
  public readonly mfaSecret: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetCustomerQueryResult.name;
}
