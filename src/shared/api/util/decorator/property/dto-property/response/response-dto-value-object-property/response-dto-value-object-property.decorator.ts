import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function ResponseDtoValueObjectProperty<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(valueObjectClass, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: String,
    isArray,
    example: props?.example,
  });
  const type = Type(() => valueObjectClass);
  const validateNested = ValidateNested({ each: isArray });
  const transform = Transform(({ value }) => {
    if (!isArray) {
      const isInstanceOfValueObject = value instanceof valueObjectClass;
      return isInstanceOfValueObject ? value.toString() : undefined;
    }

    if (!Array.isArray(value)) {
      return undefined;
    }
    return value.map((v) =>
      v instanceof valueObjectClass ? v.toString() : undefined,
    );
  });

  const decorators = [
    baseDtoProperty,
    apiProperty,
    type,
    validateNested,
    transform,
  ];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  return applyDecorators(...decorators);
}
