import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional, registerDecorator } from 'class-validator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

function IsValidValueObject<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
): PropertyDecorator {
  return function (object: object, propertyName: string | symbol): void {
    const validatorName = 'IsValidValueObject';
    const propertyKey = propertyName.toString();

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

          return false;
        },
        defaultMessage(args: ValidationArguments): string {
          try {
            const property = args.property;
            const dto = {
              ...(args.object as Record<string, unknown>),
            };
            const value = String(dto[property]);

            new valueObjectClass(value);
          } catch (err) {
            const isErrorInstance = err instanceof Error;

            if (isErrorInstance) {
              return err.message;
            }
          }

          return 'Invalid value object';
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
      return String(value);
    }

    try {
      return new valueObjectClass(value);
    } catch {
      return value;
    }
  });

  const decorators = [apiProperty, expose, transform];

  if (props?.required === true) {
    decorators.push(validation);
  } else {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
