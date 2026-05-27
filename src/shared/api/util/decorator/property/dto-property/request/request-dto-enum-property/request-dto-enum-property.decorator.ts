import { applyDecorators } from '@nestjs/common';

import { BaseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-enum-property/base-dto-enum-property.decorator';

import type { BaseDtoPropertyInputType } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function RequestDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyInputType,
): PropertyDecorator {
  const base = BaseDtoEnumProperty(enumType, props);
  return applyDecorators(base);
}
