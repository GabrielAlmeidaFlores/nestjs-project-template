import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidCityError } from '@module/customer/account/domain/schema/entity/customer-address/error/invalid-customer-address-city.error';
import { InvalidNeighborhoodError } from '@module/customer/account/domain/schema/entity/customer-address/error/invalid-customer-address-neighborhood.error';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id.value-object';

import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { CustomerAddressEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity.props.interface';
import type { StateCodeEnum } from '@module/customer/account/domain/schema/entity/customer-address/enum/state-code.enum';

export class CustomerAddressEntity extends BaseEntity<CustomerAddressId> {
  public readonly postalCode: PostalCode;
  public readonly stateCode: StateCodeEnum;
  public readonly city: string;
  public readonly neighborhood: string;
  public readonly addressNumber: number;

  protected readonly _type = CustomerAddressEntity.name;

  public constructor(props: CustomerAddressEntityPropsInterface) {
    CustomerAddressEntity.validateCity(props.city);
    CustomerAddressEntity.validateNeighborhood(props.neighborhood);

    super(CustomerAddressId, props);

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.addressNumber = props.addressNumber;
  }

  public static validateCity(name: string): void {
    const minNameLength = 1;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidCityError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }

  public static validateNeighborhood(name: string): void {
    const minNameLength = 3;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = name.length > minNameLength;
    const hasMaximumLength = name.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidNeighborhoodError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
