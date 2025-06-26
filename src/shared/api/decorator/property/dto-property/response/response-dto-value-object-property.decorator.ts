import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoValueObjectProperty<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: String,
  });
  const expose = Expose();
  const deserialize = Transform(
    ({ value }) => {
      const isInstanceOfValueObject = value instanceof valueObjectClass;
      if (isInstanceOfValueObject) {
        return value;
      }

      return new valueObjectClass(value as string);
    },
    { toClassOnly: true },
  );

  const serialize = Transform(
    ({ value }) => {
      const isInstanceOfValueObject = value instanceof valueObjectClass;
      if (isInstanceOfValueObject) {
        return value.toString();
      }

      return value as string;
    },
    { toPlainOnly: true },
  );

  const decorators = [apiProperty, expose, serialize, deserialize];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
