import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidCityError } from '@module/customer/account/domain/schema/entity/customer-address/error/invalid-customer-address-city.error';
import { InvalidNeighborhoodError } from '@module/customer/account/domain/schema/entity/customer-address/error/invalid-customer-address-neighborhood.error';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { CustomerAddressEntityPropsInterface } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity.props.interface';

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

  public static validateCity(city: string): void {
    const minNameLength = 1;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = city.length > minNameLength;
    const hasMaximumLength = city.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(city);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidCityError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }

  public static validateNeighborhood(neighborhood: string): void {
    const minNameLength = 3;
    const maxNameLength = 100;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = neighborhood.length > minNameLength;
    const hasMaximumLength = neighborhood.length < maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(neighborhood);

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
