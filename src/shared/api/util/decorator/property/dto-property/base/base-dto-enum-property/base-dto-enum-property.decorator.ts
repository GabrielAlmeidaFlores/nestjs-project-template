import { applyDecorators } from '@nestjs/common';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;
  const isArray = props?.isArray === true;

  const baseDtoProperty = BaseDtoProperty(enumType, props);
  const validation = IsEnum(enumType, {
    message: (args: ValidationArguments) => {
      const enumValues = Object.values(enumType);
      const allowedValue = enumValues.join(', ');
      return `o campo '${args.property}' não é compatível com os valores esperados: ${allowedValue}`;
    },
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
