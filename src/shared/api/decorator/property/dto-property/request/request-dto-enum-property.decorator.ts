import { applyDecorators } from '@nestjs/common';

import { BaseDtoEnumProperty } from '@shared/api/decorator/property/dto-property/base/base-dto-enum-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function RequestDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoEnumProperty(enumType, props);
  return applyDecorators(base);
}
