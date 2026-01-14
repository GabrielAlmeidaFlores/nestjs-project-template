import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class GetCustomerWithCustomerAddressRelationQueryResult extends BaseBuildableObject {
  public readonly id: CustomerId;
  public readonly name: string;
  public readonly phoneNumber: PhoneNumber;
  public readonly profilePicture: string | null;
  public readonly bankExternalId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly customerAddress: GetCustomerAddressQueryResult;

  protected override readonly _type =
    GetCustomerWithCustomerAddressRelationQueryResult.name;
}
