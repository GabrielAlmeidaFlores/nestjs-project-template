import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidPhoneNumberError } from '@core/domain/schema/value-object/phone-number/error/invalid-phone-number.error';

export class PhoneNumber extends BaseValueObject<PhoneNumber> {
  protected readonly _type = PhoneNumber.name;

  public constructor(value: string) {
    value = value.replace(/\D/g, '');

    super(value);

    const isValidPhoneNumber = PhoneNumber.isValid(value);

    if (!isValidPhoneNumber) {
      throw new InvalidPhoneNumberError();
    }
  }

  public static isValid(value: string): boolean {
    const phoneRegex = /^\d{12,13}$/;

    return phoneRegex.test(value);
  }

  public equals(other: PhoneNumber): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
