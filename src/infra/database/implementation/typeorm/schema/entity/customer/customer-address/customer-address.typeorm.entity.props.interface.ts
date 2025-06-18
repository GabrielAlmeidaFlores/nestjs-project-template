import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface CustomerAddressTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  postalCode: string;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  addressNumber: string;
  customer: CustomerEntity;
}
