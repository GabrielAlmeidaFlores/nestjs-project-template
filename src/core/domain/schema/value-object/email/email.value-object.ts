import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidEmailError } from '@core/domain/schema/value-object/email/error/invalid-email.error';

export class Email extends BaseValueObject<Email> {
  protected readonly _type = Email.name;

  public constructor(value: string) {
    super(value);

    const isValidEmail = Email.isValid(value);

    if (!isValidEmail) {
      throw new InvalidEmailError();
    }
  }

  public static isValid(value: string): boolean {
    const maxLength = 80;
    if (value.length > maxLength) {
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return emailRegex.test(value);
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
