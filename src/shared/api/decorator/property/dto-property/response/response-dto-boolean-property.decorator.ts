import { applyDecorators } from '@nestjs/common';

import { BaseDtoBooleanProperty } from '@shared/api/decorator/property/dto-property/base/base-dto-boolean-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function ResponseDtoBooleanProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoBooleanProperty(props);
  return applyDecorators(base);
}
