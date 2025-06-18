import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidPostalCodeError } from '@core/domain/schema/value-object/postal-code/error/invalid-postal-code.error';

export class DecimalValue extends BaseValueObject<DecimalValue> {
  protected readonly _type = DecimalValue.name;

  public constructor(value: string) {
    value = DecimalValue.normalize(value);

    super(value);

    const isValidPostalCode = DecimalValue.isValid(value);

    if (!isValidPostalCode) {
      throw new InvalidPostalCodeError();
    }
  }

  public static normalize(value: string): string {
    const withoutThousandsSeparator = value.replace(/\./g, '');
    return withoutThousandsSeparator.replace(',', '.');
  }

  public static isValid(value: string): boolean {
    const decimalRegex = /^-?\d+(\.\d+)?$/;

    return decimalRegex.test(value);
  }

  public equals(other: DecimalValue): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return parseFloat(this.value);
  }

  public toString(): string {
    return this.value;
  }
}
