import { applyDecorators } from '@nestjs/common';

import { BaseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-object-property/base-dto-object-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInputModel } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/model/input/base-dto-property.decorator.props.input.model';
import type { TypeHelpOptions } from 'class-transformer';

export function RequestDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInputModel,
): PropertyDecorator {
  const base = BaseDtoObjectProperty(typeFunction, props);
  return applyDecorators(base);
}
