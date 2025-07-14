import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoStringProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
  });
  const expose = Expose();
  const validation = IsString({
    message: (args: ValidationArguments) => {
      return `o campo '${args.property}' deve ser do tipo 'string'`;
    },
  });

  const decorators = [apiProperty, expose, validation];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
