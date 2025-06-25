import { applyDecorators } from '@nestjs/common';

import { BaseDtoObjectProperty } from '@shared/api/decorator/property/dto-property/base/base-dto-object.decorator';

import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/decorator/property/dto-property/base/interface/base-dto-propery.decorator.props.interface';
import type { TypeHelpOptions } from 'class-transformer';

export function ResponseDtoObjectProperty(
  typeFunction: (type?: TypeHelpOptions) => Function,
  props?: BaseDtoPropertyDecoratorPropsInterface,
): PropertyDecorator {
  const base = BaseDtoObjectProperty(typeFunction, props);
  return applyDecorators(base);
}
