import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

export interface CustomerEntityPropsInterface extends BaseEntityPropsInterface {
  name: string;
  email: Email;
  federalDocument: FederalDocument;
  phoneNumber: PhoneNumber;
  password: string | Hash;
  customerAddress: CustomerAddressEntity;
  profilePicture?: string | null;
  mfaSecret?: string | null;
}
