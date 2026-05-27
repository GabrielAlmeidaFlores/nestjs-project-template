import { applyDecorators } from '@nestjs/common';

import { BaseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-enum-property/base-dto-enum-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function ResponseDtoEnumProperty(
  enumType: object,
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const base = BaseDtoEnumProperty(enumType, props);
  return applyDecorators(base);
}
