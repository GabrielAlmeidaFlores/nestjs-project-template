import { applyDecorators } from '@nestjs/common';

import { BaseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-string-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoStringProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoStringProperty(props);
  return applyDecorators(base);
}
