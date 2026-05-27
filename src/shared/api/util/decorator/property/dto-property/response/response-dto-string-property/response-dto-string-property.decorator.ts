import { applyDecorators } from '@nestjs/common';

import { BaseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-string-property/base-dto-string-property.decorator';

import type { BaseDtoPropertyInputType } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';

export function ResponseDtoStringProperty(
  props?: BaseDtoPropertyInputType,
): PropertyDecorator {
  const base = BaseDtoStringProperty(props);
  return applyDecorators(base);
}
