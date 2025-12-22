import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidDecimalValueError } from '@core/domain/schema/value-object/decimal/error/invalid-decimal-value.error';

export class DecimalValue extends BaseValueObject<DecimalValue> {
  protected readonly _type = DecimalValue.name;

  public constructor(value: string | number) {
    if (typeof value === 'undefined') {
      throw new InvalidDecimalValueError();
    }

    value = value.toString();

    value = DecimalValue.normalize(value);

    super(value);

    const isValidPostalCode = DecimalValue.isValid(value);

    if (!isValidPostalCode) {
      throw new InvalidDecimalValueError();
    }
  }

  public static normalize(value: string): string {
    let normalized = value.trim();

    if (normalized.includes(',')) {
      normalized = normalized.replace(/\./g, '');

      normalized = normalized.replace(',', '.');
    }

    return normalized;
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
