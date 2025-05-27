import { applyDecorators } from '@nestjs/common';

import { BaseDtoNumberProperty } from '@shared/api/decorator/property/dto-property/base/base-dto-number-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoNumberProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoNumberProperty(props);
  return applyDecorators(base);
}
