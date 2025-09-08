import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { Hash } from '@core/domain/schema/value-object/hash/hash.value-object';
import { InvalidCustomerNameError } from '@module/customer/account/domain/schema/entity/customer/error/invalid-customer-name.error';
import { InvalidCustomerPasswordError } from '@module/customer/account/domain/schema/entity/customer/error/invalid-customer-password.error';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer/customer.entity.props.interface';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

export class CustomerEntity extends BaseEntity {
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly phoneNumber: PhoneNumber;
  public readonly password: string | Hash;
  public readonly profilePicture: string | null;
  public readonly mfaSecret: string | null;
  public readonly customerAddress: CustomerAddressEntity;

  protected readonly _type = CustomerEntity.name;

  public constructor(props: CustomerEntityPropsInterface) {
    CustomerEntity.validateName(props.name);
    CustomerEntity.validatePassword(props.password);

    super(props);
    this.name = props.name;
    this.email = props.email;
    this.federalDocument = props.federalDocument;
    this.phoneNumber = props.phoneNumber;
    this.password = props.password;
    this.customerAddress = this.customerAddress;
    this.profilePicture = props.profilePicture ?? null;
    this.mfaSecret = props.mfaSecret ?? null;
  }

  public static validateName(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 50;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = name.length >= minNameLength;
    const hasMaximumLength = name.length <= maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidCustomerNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
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
      () =>
        new InvalidCustomerPasswordError({
          maxLength: maxPasswordLength,
          minLength: minPasswordLength,
        }),
    );
  }
}
