import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export abstract class BaseAutoMapperProfile {
  protected convertStringToEnum<
    T extends Record<Extract<keyof T, string>, string>,
  >(enumObj: T, key?: string): T[keyof T] {
    return enumObj[key as keyof T];
  }

  protected convertOptionalStringToValueObject<T extends BaseValueObject<T>>(
    valueObjectClass: new (value: string) => T,
    value: string | null,
  ): T | null {
    if (value === null) {
      return null;
    }

    return new valueObjectClass(value);
  }

  protected convertOptionalValueObjectToString<T extends BaseValueObject<T>>(
    valueObject: T | null,
  ): string | null {
    if (valueObject === null) {
      return null;
    }

    return valueObject.toString();
  }
}
