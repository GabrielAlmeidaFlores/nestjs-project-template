import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';

export function BaseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const baseDtoProperty = BaseDtoProperty(typeFunction(), props);
  const objectType = Type(typeFunction);
  const validateNested = ValidateNested();

  const decorators = [baseDtoProperty, objectType, validateNested];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
