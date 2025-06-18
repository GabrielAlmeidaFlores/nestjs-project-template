import type { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

type WithIdType = { id: BaseEntity['id'] };

export type RelationType<T> =
  T extends Array<WithIdType>
    ? Array<Pick<T[number], 'id'>>
    : T extends WithIdType
      ? Pick<T, 'id'>
      : never;
