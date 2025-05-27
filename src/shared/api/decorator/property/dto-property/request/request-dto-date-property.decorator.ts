import { applyDecorators } from '@nestjs/common';

import { BaseDtoDateProperty } from '@shared/api/decorator/property/dto-property/base/base-dto-date-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';

export function RequestDtoDateProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoDateProperty(props);
  return applyDecorators(base);
}
