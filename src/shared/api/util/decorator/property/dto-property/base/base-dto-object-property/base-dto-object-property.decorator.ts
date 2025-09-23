import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoObjectPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-object-property/base-dto-object-property.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';

export function BaseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoObjectPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const propertyIsArray = props?.isArray ?? false;

  const baseDtoProperty = BaseDtoProperty(typeFunction(), props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: typeFunction(),
    isArray: propertyIsArray,
    example: props?.example,
  });
  const objectType = Type(typeFunction);
  const validateNested = ValidateNested();

  const decorators = [baseDtoProperty, apiProperty, objectType, validateNested];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
