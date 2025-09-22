import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoValueObjectProperty<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const baseDtoProperty = BaseDtoProperty(valueObjectClass, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: String,
  });
  const type = Type(() => valueObjectClass);
  const validateNested = ValidateNested();

  const decorators = [baseDtoProperty, apiProperty, type, validateNested];

  if (propertyIsRequired) {
    decorators.push(
      Transform(({ value }) => {
        const isInstanceOfValueObject = value instanceof valueObjectClass;
        return isInstanceOfValueObject ? value.toString() : undefined;
      }),
    );
  } else {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
