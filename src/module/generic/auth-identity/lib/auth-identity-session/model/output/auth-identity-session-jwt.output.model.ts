import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export class AuthIdentitySessionJwtOutputModel extends BaseBuildableObject {
  public authIdentity: string;
  public sessionId: string;
  public userLevel: UserLevelEnum;

  protected override readonly _type = AuthIdentitySessionJwtOutputModel.name;
}
