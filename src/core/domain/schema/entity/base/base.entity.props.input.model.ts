import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BaseEntityPropsInputModel<
  Id extends Guid,
> extends BaseBuildableObject {
  public id?: Id | null;
  public createdAt?: Date | null;
  public updatedAt?: Date | null;
  public deletedAt?: Date | null;
  protected override readonly _type = BaseEntityPropsInputModel.name;
}
