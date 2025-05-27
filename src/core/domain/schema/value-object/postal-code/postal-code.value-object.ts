import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidPostalCodeError } from '@core/domain/schema/value-object/postal-code/error/invalid-postal-code.error';

export class PostalCode extends BaseValueObject<PostalCode> {
  protected readonly _type = PostalCode.name;

  public constructor(value: string) {
    super(value);

    const isValidPostalCode = PostalCode.isValid(value);

    if (!isValidPostalCode) {
      throw new InvalidPostalCodeError();
    }
  }

  public static isValid(value: string): boolean {
    const postalCodeRegex = /^\d{8}$/;

    return postalCodeRegex.test(value);
  }

  public equals(other: PostalCode): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
