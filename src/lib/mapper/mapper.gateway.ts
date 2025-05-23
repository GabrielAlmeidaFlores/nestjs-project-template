import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MapperGateway {
  public abstract map<TSource, TDestination>(
    source: TSource,
    sourceType: ConstructorType<TSource>,
    destinationType: ConstructorType<TDestination>,
  ): TDestination;

  public abstract mapArray<TSource, TDestination>(
    sourceArray: TSource[],
    sourceType: ConstructorType<TSource>,
    destinationType: ConstructorType<TDestination>,
  ): TDestination[];
}
