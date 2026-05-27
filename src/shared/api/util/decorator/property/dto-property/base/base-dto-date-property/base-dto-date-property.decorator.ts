import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsOptional } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoDateProperty(
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(Date, props);
  const transform = Transform(({ value }: { value: unknown }) => {
    if (value === null || value === undefined) {
      return value;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      return isNaN(date.getTime()) ? value : date;
    }
    return value;
  });
  const validation = IsDate({
    each: isArray,
    message: (args: ValidationArguments) =>
      `o campo '${args.property}' deve ser do tipo 'date'`,
  });

  const decorators = [baseDtoProperty, transform, validation];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  if (isArray) {
    decorators.push(IsArray());
  }

  return applyDecorators(...decorators);
}
