import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import type { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoValueObjectProperty<T extends BaseValueObject<T>>(
  valueObjectClass: new (value: string) => T,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const decorators = [
    ApiProperty({ required: propertyIsRequired, type: String }),
    Expose(),
    Type(() => valueObjectClass),
    ValidateNested(),
  ];

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
