import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidCustomerNameError } from '@module/customer/account/domain/schema/entity/customer/error/invalid-customer-name.error';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CustomerEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer/customer.entity.props.interface';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

export class CustomerEntity extends BaseEntity<CustomerId> {
  public readonly name: string;
  public readonly phoneNumber: PhoneNumber;
  public readonly profilePicture: string | null;
  public readonly customerAddress: CustomerAddressEntity;

  protected readonly _type = CustomerEntity.name;

  public constructor(props: CustomerEntityPropsInterface) {
    CustomerEntity.validateName(props.name);

    super(CustomerId, props);

    this.name = props.name;
    this.phoneNumber = props.phoneNumber;
    this.customerAddress = props.customerAddress;
    this.profilePicture = props.profilePicture ?? null;
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
}
