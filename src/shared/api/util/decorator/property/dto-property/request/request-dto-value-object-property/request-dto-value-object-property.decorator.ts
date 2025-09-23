import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, registerDecorator } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';
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

  const baseDtoProperty = BaseDtoProperty(valueObjectClass, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: String,
    example: props?.example,
  });
  const validation = IsValidValueObject(valueObjectClass);
  const transform = Transform(({ value }) => {
    const isInvalidInput = typeof value !== 'string';

    if (isInvalidInput) {
      return undefined;
    }

    try {
      return new valueObjectClass(value);
    } catch {
      return value;
    }
  });

  const decorators = [baseDtoProperty, apiProperty, transform];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  decorators.push(validation);

  return applyDecorators(...decorators);
}
