import { applyDecorators } from '@nestjs/common';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoBooleanProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(Boolean, props);
  const validation = IsBoolean({
    each: isArray,
    message: (args: ValidationArguments) =>
      `o campo '${args.property}' deve ser do tipo 'boolean'`,
  });

  const decorators = [baseDtoProperty, validation];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  if (isArray) {
    decorators.push(IsArray());
  }

  return applyDecorators(...decorators);
}
