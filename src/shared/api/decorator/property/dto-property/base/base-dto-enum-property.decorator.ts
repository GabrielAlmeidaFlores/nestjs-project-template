import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { ValidationArguments } from 'class-validator';

export function BaseDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    enum: enumType,
  });
  const expose = Expose();
  const validation = IsEnum(enumType, {
    message: (args: ValidationArguments) => {
      const enumValues = Object.values(enumType);
      const allowedValue = enumValues.join(', ');
      return `'${args.value}' não é compatível com os valores esperados: ${allowedValue}`;
    },
  });

  const decorators = [apiProperty, expose, validation];

  if (!propertyIsRequired) {
    decorators.push(IsOptional());
  }

  return applyDecorators(...decorators);
}
