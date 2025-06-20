import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';

export interface CustomerAddressEntityPropsInterface
  extends BaseEntityPropsInterface {
  postalCode: PostalCode;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  addressNumber: number;
  customer: CustomerEntity;
}
