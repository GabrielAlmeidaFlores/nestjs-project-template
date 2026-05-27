import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class GetUserQueryResult extends BaseBuildableObject {
  public readonly id: UserId;
  public readonly authIdentityId: AuthIdentityId;
  public readonly name: string;
  public readonly username: string;
  public readonly bio: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetUserQueryResult.name;
}
