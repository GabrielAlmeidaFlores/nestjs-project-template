import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/entity/assets/value-object/guid/guid.value-object';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export class UserDataOutputModel extends BaseBuildableObject {
  public userId: Guid;
  public userLevel: UserLevelEnum;

  protected override readonly _type = UserDataOutputModel.name;
}
