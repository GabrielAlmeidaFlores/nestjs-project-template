import { applyDecorators } from '@nestjs/common';

import { BaseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-enum-property/base-dto-enum-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';

export function ResponseDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoEnumProperty(enumType, props);
  return applyDecorators(base);
}
