import type { Guid } from '@core/domain/schema/assets/value-object/guid/guid.value-object';

export interface BaseEntityPropsInterface {
  id?: Guid;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
