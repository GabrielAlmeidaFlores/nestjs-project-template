import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidGuidError } from '@core/domain/schema/value-object/guid/error/invalid-guid.error';

export class Guid extends BaseValueObject<Guid> {
  protected readonly _type = Guid.name;

  public constructor(value: string) {
    super(value);

    if (!Guid.isValid(value)) {
      throw new InvalidGuidError();
    }
  }

  public static generate(): Guid {
    const hexBase = 16;
    const uuidVariantMask = 0x3;
    const uuidVariantHighBits = 0x8;
    const bitwiseZero = 0;

    const value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const randomHexDigit = (Math.random() * hexBase) | bitwiseZero;
        const v =
          c === 'x'
            ? randomHexDigit
            : (randomHexDigit & uuidVariantMask) | uuidVariantHighBits;
        return v.toString(hexBase);
      },
    );

    return new Guid(value);
  }

  public static isValid(value: string): boolean {
    const guidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  }

  public equals(other: Guid): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
