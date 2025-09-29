import { applyDecorators } from '@nestjs/common';

import { BaseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/base/base-dto-object-property/base-dto-object-property.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-property.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';

export function RequestDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoObjectProperty(typeFunction, props);
  return applyDecorators(base);
}
