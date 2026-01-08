import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDtoProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/base-dto-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';

export function ResponseDtoBase64FileProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const propertyIsRequired = props?.required ?? true;

  const baseDtoProperty = BaseDtoProperty(String, props);
  const apiProperty = ApiProperty({
    required: propertyIsRequired,
    type: 'string',
    format: 'base64',
    description: props?.description ?? 'Base64 string',
    example: props?.example,
  });

  return applyDecorators(baseDtoProperty, apiProperty);
}
