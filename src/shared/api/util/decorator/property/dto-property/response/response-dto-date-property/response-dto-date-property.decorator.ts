import { applyDecorators } from '@nestjs/common';

import { BaseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-date-property/base-dto-date-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';

export function ResponseDtoDateProperty(
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoDateProperty(props);
  return applyDecorators(base);
}
