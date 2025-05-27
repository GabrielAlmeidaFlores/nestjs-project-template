import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidCustomerNameError } from '@core/domain/schema/entity/customer/error/invalid-customer-name.error';
import { InvalidCustomerPasswordError } from '@core/domain/schema/entity/customer/error/invalid-custommer-password.error';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { RequireBuildMethod } from '@shared/system/decorator/class/require-build-method/require-build-method.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

import type { CountryStateEnum } from '@core/domain/schema/enum/country-state.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { Url } from '@core/domain/schema/value-object/url/url.value-object';

@RequireBuildMethod<CustomerEntity>()
export class CustomerEntity extends BaseEntity {
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly phoneNumber: PhoneNumber;
  public readonly password: string | Hash;

  public readonly profilePicture: Url | null;
  public readonly mfaSecret: string | null;

  public readonly city: string;
  public readonly neighborhood: string;
  public readonly countryState: CountryStateEnum;
  public readonly postalCode: PostalCode;
  public readonly addressNumber: string;

  protected readonly _type = CustomerEntity.name;

  public constructor(
    id: Guid | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null,
    name: string,
    email: Email,
    federalDocument: FederalDocument,
    phoneNumber: PhoneNumber,
    password: string | Hash,
    profilePicture: Url | null,
    mfaSecret: string | null,
    city: string,
    neighborhood: string,
    countryState: CountryStateEnum,
    postalCode: PostalCode,
    addressNumber: string,
  ) {
    CustomerEntity.validateName(name);
    CustomerEntity.validatePassword(password);

    super(id, createdAt, updatedAt, deletedAt);
    this.name = name;
    this.email = email;
    this.federalDocument = federalDocument;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.profilePicture = profilePicture;
    this.mfaSecret = mfaSecret;
    this.city = city;
    this.neighborhood = neighborhood;
    this.countryState = countryState;
    this.postalCode = postalCode;
    this.addressNumber = addressNumber;
  }

  public static build(
    props: PublicPropertyType<CustomerEntity>,
  ): CustomerEntity {
    return new CustomerEntity(
      props.id,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
      props.name,
      props.email,
      props.federalDocument,
      props.phoneNumber,
      props.password,
      props.profilePicture,
      props.mfaSecret,
      props.city,
      props.neighborhood,
      props.countryState,
      props.postalCode,
      props.addressNumber,
    );
  }

  public static validateName(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 50;
    const nameRegex = /^[A-Za-z ]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      InvalidCustomerNameError,
    );
  }

  public static validatePassword(password: string | Hash): void {
    const isHashedPassword = password instanceof Hash;
    if (isHashedPassword) {
      return;
    }

    const minPasswordLength = 3;
    const maxPasswordLength = 50;

    const hasMinimumLength = password.length > minPasswordLength;
    const hasMaximumLength = password.length < maxPasswordLength;

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength],
      InvalidCustomerPasswordError,
    );
  }
}
