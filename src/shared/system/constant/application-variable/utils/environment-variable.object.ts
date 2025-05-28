import { InvalidApplicationVariableTypeError } from '@shared/system/constant/application-variable/utils/error/invalid-application-variable.error';
import { MissingApplicationVariableError } from '@shared/system/constant/application-variable/utils/error/missing-application-variable.error';
import 'dotenv/config';

export class EnvironmentVariable {
  protected readonly _type = EnvironmentVariable.name;

  public getOrThrow<T>(
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
      });
    }

    return convertedValue;
  }

  public getOrDefault<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
    defaultValue: T,
  ): T {
    const value = process.env[key];

    const isVariableMissing = value === undefined;

    if (isVariableMissing) {
      return defaultValue;
    }

    try {
      const convertedValue = this.convertValue<T>(value, type);
      const conversionFailed = convertedValue === null;

      if (conversionFailed) {
        throw new InvalidApplicationVariableTypeError({
          variableName: key,
          expectedType: type.name,
        });
      }

      return convertedValue;
    } catch {
      return defaultValue;
    }
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
