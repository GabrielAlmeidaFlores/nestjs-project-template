import { MissingApplicationVariableError } from '@shared/system/constant/application-variable/utils/error/missing-application-variable.error';
import 'dotenv/config';

export class EnvironmentVariable {
  protected readonly _type = EnvironmentVariable.name;

  public getOrThrow<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): T {
    const value = process.env[key];

    if (value === undefined) {
      throw new MissingApplicationVariableError();
    }

    return this.convertValue<T>(value, type);
  }

  public getOrDefault<T>(
    key: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
    defaultValue: T,
  ): T {
    const value = process.env[key];

    if (value === undefined) {
      return defaultValue;
    }

    try {
      return this.convertValue<T>(value, type);
    } catch {
      return defaultValue;
    }
  }

  private convertValue<T>(
    rawValue: string,
    type: StringConstructor | NumberConstructor | BooleanConstructor,
  ): T {
    if (type === Number) {
      const num = Number(rawValue);
      if (isNaN(num)) {
        throw new MissingApplicationVariableError();
      }
      return num as T;
    }

    if (type === Boolean) {
      return (rawValue === 'true') as T;
    }

    return rawValue as T;
  }
}
