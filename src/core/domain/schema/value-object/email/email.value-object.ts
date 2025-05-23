import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidEmailError } from '@core/domain/schema/value-object/email/error/invalid-email.error';

export class Email extends BaseValueObject<Email> {
  protected readonly _type = Email.name;

  public constructor(value: string) {
    super(value);

    if (!Email.isValid(value)) {
      throw new InvalidEmailError();
    }
  }

  public static isValid(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(value);
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
