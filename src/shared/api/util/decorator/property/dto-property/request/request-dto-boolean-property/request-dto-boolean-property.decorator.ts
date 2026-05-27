import { applyDecorators } from '@nestjs/common';

import { BaseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-boolean-property/base-dto-boolean-property.decorator';

import type { BaseDtoPropertyInputType } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function RequestDtoBooleanProperty(
  props?: BaseDtoPropertyInputType,
): PropertyDecorator {
  const base = BaseDtoBooleanProperty(props);
  return applyDecorators(base);
}
