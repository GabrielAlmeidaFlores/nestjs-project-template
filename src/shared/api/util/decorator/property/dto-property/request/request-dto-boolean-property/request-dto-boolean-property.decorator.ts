import { applyDecorators } from '@nestjs/common';

import { BaseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-boolean-property/base-dto-boolean-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';

export function RequestDtoBooleanProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoBooleanProperty(props);
  return applyDecorators(base);
}
