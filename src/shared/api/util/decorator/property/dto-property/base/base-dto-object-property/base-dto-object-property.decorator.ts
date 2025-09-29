import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(typeFunction(), props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: typeFunction(),
    isArray: isArray,
    example: props?.example,
  });
  const objectType = Type(typeFunction);
  const validateNested = ValidateNested({
    each: isArray,
    message: (args: ValidationArguments) => {
      const functionName = typeFunction().name;
      const functionType = isArray ? `Array<${functionName}>` : functionName;
      return `o campo '${args.property}' não é compatível com o tipo ${functionType}`;
    },
  });

  const decorators = [baseDtoProperty, apiProperty, objectType, validateNested];

  if (!propertyIsRequired) {
    decorators.unshift(IsOptional());
  }

  return applyDecorators(...decorators);
}
