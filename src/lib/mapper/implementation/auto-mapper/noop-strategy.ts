import { defaultStrategyInitializerOptions } from '@automapper/core';

import type {
  MappingStrategy,
  MappingStrategyInitializer,
  MetadataIdentifier,
} from '@automapper/core';

export function noopStrategy(): MappingStrategyInitializer<MetadataIdentifier> {
  const { applyMetadata, preMap, postMap } = defaultStrategyInitializerOptions;

  return (mapper) => {
    const strategy: MappingStrategy<MetadataIdentifier> = {
      mapper,
      destinationConstructor: (_, destinationIdentifier) => {
        try {
          return new (destinationIdentifier as new () => unknown)();
        } catch {
          return Object.create(
            (destinationIdentifier as { prototype: object }).prototype,
          ) as unknown;
        }
      },
      get applyMetadata() {
        return applyMetadata(
          this as unknown as MappingStrategy<MetadataIdentifier>,
        );
      },
      retrieveMetadata: () => new Map(),
      preMap,
      postMap,
    };

    return strategy;
  };
}
