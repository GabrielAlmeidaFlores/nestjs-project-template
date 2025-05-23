import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidUrlError } from '@core/domain/schema/value-object/url/error/invalid-url.error';

export class Url extends BaseValueObject<Url> {
  public readonly metadata: URL;

  protected readonly _type = Url.name;

  public constructor(value: string) {
    super(value);

    if (!Url.isValid(value)) {
      throw new InvalidUrlError();
    }

    this.metadata = new URL(value);
  }

  public static isValid(value: string): boolean {
    const urlRegex =
      /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?$/;

    return urlRegex.test(value);
  }

  public equals(other: Url): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
