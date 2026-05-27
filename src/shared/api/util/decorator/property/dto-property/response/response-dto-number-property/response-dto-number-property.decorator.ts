import { applyDecorators } from '@nestjs/common';

import { BaseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-number-property/base-dto-number-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function ResponseDtoNumberProperty(
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const base = BaseDtoNumberProperty(props);
  return applyDecorators(base);
}
