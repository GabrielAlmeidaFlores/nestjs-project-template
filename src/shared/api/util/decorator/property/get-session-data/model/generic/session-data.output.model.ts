import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export class SessionDataModel extends BaseBuildableObject {
  public authIdentityId: AuthIdentityId;
  public sessionId: Guid;
  public userLevel: UserLevelEnum;

  protected override readonly _type = SessionDataModel.name;
}
