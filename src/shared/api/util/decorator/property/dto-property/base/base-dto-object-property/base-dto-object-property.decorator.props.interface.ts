import type { BaseDtoPropertyDecoratorPropsInterface } from '@shared/api/util/decorator/property/dto-property/base/base-dto-property/interface/base-dto-propery.decorator.props.interface';

export interface BaseDtoObjectPropertyDecoratorPropsInterface
  extends BaseDtoPropertyDecoratorPropsInterface {
  isArray?: boolean;
}
