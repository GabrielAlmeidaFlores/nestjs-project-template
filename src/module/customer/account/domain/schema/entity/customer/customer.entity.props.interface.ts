import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

export interface CustomerEntityPropsInterface
  extends BaseEntityPropsInterface<CustomerId> {
  name: string;
  customerAddress: CustomerAddressEntity;
  bankExternalId: string;
  profilePicture?: string | null;
}
