import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

export interface AuthIdentityEntityPropsInterface
  extends BaseEntityPropsInterface<AuthIdentityId> {
  email: Email;
  password: string | HashedPassword;
  isActive?: boolean | null;
}
