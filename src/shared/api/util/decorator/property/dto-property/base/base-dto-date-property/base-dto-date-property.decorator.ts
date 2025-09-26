import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoDateProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(Date, props);
  const type = Type(() => Date);
  const validation = IsDate({
    each: isArray,
    message: (args: ValidationArguments) =>
      `o campo '${args.property}' deve ser do tipo 'date'`,
  });

  const decorators = [baseDtoProperty, type, validation];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  if (isArray) {
    decorators.push(IsArray());
  }

  return applyDecorators(...decorators);
}
