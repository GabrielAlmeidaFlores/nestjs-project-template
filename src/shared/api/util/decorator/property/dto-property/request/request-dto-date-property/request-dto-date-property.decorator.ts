import { applyDecorators } from '@nestjs/common';

import { BaseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-date-property/base-dto-date-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function RequestDtoDateProperty(
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const base = BaseDtoDateProperty(props);
  return applyDecorators(base);
}
