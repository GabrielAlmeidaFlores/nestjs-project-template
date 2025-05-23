import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MapperGateway } from '@lib/mapper/mapper.gateway';

@Injectable()
export class AutoMapperService implements MapperGateway {
  protected readonly _type = AutoMapperService.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {}

  public map<TSource, TDestination>(
    source: TSource,
    sourceType: new () => TSource,
    destination: new () => TDestination,
  ): TDestination {
    return this.mapper.map(source, sourceType, destination);
  }

  public mapArray<TSource, TDestination>(
    sourceArray: TSource[],
    sourceType: new () => TSource,
    destination: new () => TDestination,
  ): TDestination[] {
    return sourceArray.map((source) =>
      this.mapper.map(source, sourceType, destination),
    );
  }
}
