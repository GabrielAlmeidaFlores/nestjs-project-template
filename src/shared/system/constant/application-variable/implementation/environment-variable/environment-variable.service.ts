import 'dotenv/config';
import { InvalidApplicationVariableTypeError } from '@shared/system/constant/application-variable/implementation/environment-variable/error/invalid-application-variable.error';
import { MissingApplicationVariableError } from '@shared/system/constant/application-variable/implementation/environment-variable/error/missing-application-variable.error';

import type { ApplicationVariableGateway } from '@shared/system/constant/application-variable/application-variable.gateway';

export class EnvironmentVariableService implements ApplicationVariableGateway {
  protected readonly _type = EnvironmentVariableService.name;

  public getArrayOrThrow<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): Array<T> {
    const value = process.env[key];
    const isVariableMissing = value === undefined;

    if (isVariableMissing) {
      throw new MissingApplicationVariableError({ variableName: key });
    }

    const rawItems = value.split(',');
    const items = rawItems.map((item) => item.trim());
    const convertedItems: T[] = [];

    for (const item of items) {
      const converted = this.convertValue<T>(item, type);
      const conversionFailed = converted === null;

      if (conversionFailed) {
        throw new InvalidApplicationVariableTypeError({
          variableName: key,
          expectedType: `${type.name}[]`,
          currentValue: item,
        });
      }

      convertedItems.push(converted);
    }

    return convertedItems;
  }

  public getValueOrThrow<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): T {
    const value = process.env[key];
    const isVariableMissing = value === undefined;

    if (isVariableMissing) {
      throw new MissingApplicationVariableError({ variableName: key });
    }

    const convertedValue = this.convertValue<T>(value, type);
    const conversionFailed = convertedValue === null;

    if (conversionFailed) {
      throw new InvalidApplicationVariableTypeError({
        variableName: key,
        expectedType: type.name,
        currentValue: value,
      });
    }

    return convertedValue;
  }

  public getValueOrDefault<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
    defaultValue: T,
  ): T {
    const value = process.env[key];

    const isVariableMissing = value === undefined;

    if (isVariableMissing) {
      return defaultValue;
    }

    const convertedValue = this.convertValue<T>(value, type);
    const conversionFailed = convertedValue === null;

    if (conversionFailed) {
      throw new InvalidApplicationVariableTypeError({
        variableName: key,
        expectedType: type.name,
        currentValue: value,
      });
    }

    return convertedValue;
  }

  private convertValue<T>(
    rawValue: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): T | null {
    const isNumber = type === Number;
    if (isNumber) {
      const num = Number(rawValue);
      const isNotNumber = isNaN(num);

      if (isNotNumber) {
        return null;
      }

      return num as T;
    }

    const isBoolean = type === Boolean;
    if (isBoolean) {
      const lowerValue = rawValue.toLowerCase();
      const isValidBoolean = lowerValue === 'true' || lowerValue === 'false';

      if (!isValidBoolean) {
        return null;
      }

      return (rawValue === 'true') as T;
    }

    return rawValue as T;
  }
}
