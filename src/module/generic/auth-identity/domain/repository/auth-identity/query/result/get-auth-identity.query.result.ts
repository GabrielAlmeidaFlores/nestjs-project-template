import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

export class GetAuthIdentityQueryResult extends BaseBuildableObject {
  public readonly id: AuthIdentityId;
  public readonly email: Email;
  public readonly password: HashedPassword;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetAuthIdentityQueryResult.name;
}
