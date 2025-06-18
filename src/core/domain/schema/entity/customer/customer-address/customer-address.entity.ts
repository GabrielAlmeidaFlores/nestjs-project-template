import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';
import { InvalidCityError } from '@core/domain/schema/entity/customer/customer-address/error/invalid-customer-adress-city.error';
import { InvalidNeighborhoodError } from '@core/domain/schema/entity/customer/customer-address/error/invalid-customer-adress-neighborhood.error';

import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { CustomerAddressEntityPropsInterface } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity.props.interface';
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
    CustomerAddressEntity.validateCity(props.city);
    CustomerAddressEntity.validateNeighborhood(props.neighborhood);

    super(props);

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.addressNumber = props.addressNumber;
    this.customer = props.customer;
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
