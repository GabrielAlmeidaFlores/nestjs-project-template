import { applyDecorators } from '@nestjs/common';

import { BaseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-number-property/base-dto-number-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoNumberProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoNumberProperty(props);
  return applyDecorators(base);
}
