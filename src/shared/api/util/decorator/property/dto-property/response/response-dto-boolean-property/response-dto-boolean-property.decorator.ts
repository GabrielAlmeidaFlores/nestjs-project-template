import { applyDecorators } from '@nestjs/common';

import { BaseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-boolean-property/base-dto-boolean-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';

export function ResponseDtoBooleanProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoBooleanProperty(props);
  return applyDecorators(base);
}
