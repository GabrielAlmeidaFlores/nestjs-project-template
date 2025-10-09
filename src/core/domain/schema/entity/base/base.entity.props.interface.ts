import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface BaseEntityPropsInterface<Id extends Guid> {
  id?: Id | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
