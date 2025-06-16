import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';
import type { CustomerAddressEntityPropsInterface } from '@core/domain/schema/entity/customer-address/customer-address.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';

export class CustomerAddressEntity extends BaseEntity {
  public readonly postalCode: PostalCode;
  public readonly stateCode: StateCodeEnum;
  public readonly city: string;
  public readonly neighborhood: string;
  public readonly addressNumber: number;
  public readonly customer: CustomerEntity;

  protected readonly _type = CustomerAddressEntity.name;

  public constructor(props: CustomerAddressEntityPropsInterface) {
    super(props);

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.addressNumber = props.addressNumber;
    this.customer = props.customer;
  }
}
