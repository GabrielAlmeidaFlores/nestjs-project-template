import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CountryStateEnum } from '@core/domain/schema/enum/country-state.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { Url } from '@core/domain/schema/value-object/url/url.value-object';

export interface CustomerEntityPropsInterface extends BaseEntityPropsInterface {
  name: string;
  email: Email;
  federalDocument: FederalDocument;
  phoneNumber: PhoneNumber;
  password: string | Hash;
  profilePicture?: Url | null;
  mfaSecret?: string | null;
  city: string;
  neighborhood: string;
  countryState: CountryStateEnum;
  postalCode: PostalCode;
  addressNumber: string;
}
