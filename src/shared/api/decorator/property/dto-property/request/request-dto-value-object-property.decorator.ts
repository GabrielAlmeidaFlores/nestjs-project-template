import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional, registerDecorator } from 'class-validator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

function IsValidValueObject<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
): PropertyDecorator {
  return function (object: object, propertyName: string | symbol): void {
    const validatorName = 'IsValidValueObject';
    const propertyKey = propertyName.toString();

    let lastErrorMessage: string | null = null;

    registerDecorator({
      name: validatorName,
      target: object.constructor,
      propertyName: propertyKey,
      validator: {
        validate(value: unknown, _args: ValidationArguments): boolean {
          const isDirectInstance = value instanceof valueObjectClass;
          if (isDirectInstance) {
            return true;
          }

          try {
            const parsedValue = String(value);
            const instance = new valueObjectClass(parsedValue);
            const isValid = instance instanceof valueObjectClass;
            return isValid;
          } catch (err) {
            const isValueObjectError = err instanceof Error;

            if (isValueObjectError) {
              lastErrorMessage = err.message;
            }

            return false;
          }
        },
        defaultMessage(): string {
          return (
            lastErrorMessage ?? `Invalid value for ${valueObjectClass.name}.`
          );
        },
      },
    });
  };
}

export function RequestDtoValueObjectProperty<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: String,
  });
  const expose = Expose();
  const validation = IsValidValueObject(valueObjectClass);
  const transform = Transform(({ value }) => {
    const isInvalidInput = typeof value !== 'string';
    if (isInvalidInput) {
      return undefined;
    }

    try {
      return new valueObjectClass(value);
    } catch {
      return undefined;
    }
  });

  const decorators = [apiProperty, expose, validation, transform];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
