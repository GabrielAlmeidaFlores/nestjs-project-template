import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { CustomerAddressEntity } from '@module/customer/auth/domain/schema/entity/customer-address/customer-address.entity';

export interface CustomerEntityPropsInterface
  extends BaseEntityPropsInterface<CustomerId> {
  name: string;
  phoneNumber: PhoneNumber;
  customerAddress: CustomerAddressEntity;
  profilePicture?: string | null;
  mfaSecret?: string | null;
}
