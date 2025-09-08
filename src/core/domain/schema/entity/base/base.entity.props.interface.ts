import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface BaseEntityPropsInterface {
  id?: Guid | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
