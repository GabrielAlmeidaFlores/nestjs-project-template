import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';

export function BaseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
  });
  const expose = Expose();
  const objectType = Type(typeFunction);
  const validateNested = ValidateNested();

  const decorators = [apiProperty, expose, objectType, validateNested];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
