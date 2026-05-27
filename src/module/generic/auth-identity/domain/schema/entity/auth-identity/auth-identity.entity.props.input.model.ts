import { BaseEntityPropsInputModel } from '@core/domain/schema/entity/base/base.entity.props.input.model';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

export class AuthIdentityEntityPropsInputModel extends BaseEntityPropsInputModel<AuthIdentityId> {
  protected override readonly _type = AuthIdentityEntityPropsInputModel.name;

  public email: Email;
  public password: string | HashedPassword;
  public isActive?: boolean | null;
}
