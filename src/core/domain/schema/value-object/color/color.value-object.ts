import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidColorValueError } from '@core/domain/schema/value-object/color/error/invalid-color-value.error';

export class ColorValue extends BaseValueObject<ColorValue> {
  private static readonly HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  private static readonly RGB_REGEX =
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  private static readonly RGBA_REGEX =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;

  protected readonly _type = ColorValue.name;

  public constructor(value: string) {
    if (!ColorValue.isValid(value)) {
      throw new InvalidColorValueError();
    }

    super(value.trim());
  }

  public static isValid(value: string): boolean {
    if (!value || typeof value !== 'string') {
      return false;
    }

    const trimmed = value.trim();

    return (
      ColorValue.HEX_REGEX.test(trimmed) ||
      ColorValue.RGB_REGEX.test(trimmed) ||
      ColorValue.RGBA_REGEX.test(trimmed)
    );
  }

  public equals(other: ColorValue): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
