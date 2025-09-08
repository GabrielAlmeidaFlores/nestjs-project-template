import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';

export interface CustomerAddressEntityPropsInterface
  extends BaseEntityPropsInterface {
  postalCode: PostalCode;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  addressNumber: number;
}
