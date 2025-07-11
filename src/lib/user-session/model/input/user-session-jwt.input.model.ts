import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export class UserSessionJwtInputModel extends BaseBuildableObject {
  public customerId: string;
  public sessionId: string;
  public userLevel: UserLevelEnum;

  protected override readonly _type = UserSessionJwtInputModel.name;
}
