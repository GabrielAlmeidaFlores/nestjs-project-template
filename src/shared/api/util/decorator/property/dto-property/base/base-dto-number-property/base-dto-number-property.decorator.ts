import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoNumberProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const baseDtoProperty = BaseDtoProperty(Number, props);
  const type = Type(() => Number);
  const validation = IsNumber(
    {},
    {
      message: (args: ValidationArguments) =>
        `o campo '${args.property}' deve ser do tipo 'number'`,
    },
  );

  const decorators = [baseDtoProperty, type, validation];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
