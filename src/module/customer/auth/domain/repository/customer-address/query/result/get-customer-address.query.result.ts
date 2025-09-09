import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { StateCodeEnum } from '@module/customer/auth/domain/schema/entity/customer-address/enum/state-code.enum';
import type { CustomerAddressId } from '@module/customer/auth/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

export class GetCustomerAddressQueryResult extends BaseBuildableObject {
  public readonly id: CustomerAddressId;
  public readonly postalCode: PostalCode;
  public readonly stateCode: StateCodeEnum;
  public readonly city: string;
  public readonly neighborhood: string;
  public readonly addressNumber: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetCustomerAddressQueryResult.name;
}
