import { applyDecorators } from '@nestjs/common';

import { BaseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-string-property/base-dto-string-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';

export function RequestDtoStringProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoStringProperty(props);
  return applyDecorators(base);
}
