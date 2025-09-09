import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { StateCodeEnum } from '@module/customer/auth/domain/schema/entity/customer-address/enum/state-code.enum';
import type { CustomerAddressId } from '@module/customer/auth/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

export interface CustomerAddressEntityPropsInterface
  extends BaseEntityPropsInterface<CustomerAddressId> {
  postalCode: PostalCode;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  addressNumber: number;
}
