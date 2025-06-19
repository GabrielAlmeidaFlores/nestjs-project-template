import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';
import type { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';

export interface CustomerAddressTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  postalCode: string;
  stateCode: StateCodeEnum;
  city: string;
  neighborhood: string;
  addressNumber: string;
  customer: CustomerTypeormEntity;
}
