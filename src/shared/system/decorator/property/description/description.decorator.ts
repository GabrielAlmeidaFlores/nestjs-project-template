import { DESCRIPTION_SYMBOL } from '@shared/system/decorator/property/description/symbol/description.symbol';

export function Description(description: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      DESCRIPTION_SYMBOL,
      description,
      target,
      propertyKey,
    );
  };
}
