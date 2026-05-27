import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidPasswordError } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/error/invalid-password.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { AuthIdentityEntityPropsInputModel } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity.props.input.model';

export class AuthIdentityEntity extends BaseEntity<AuthIdentityId> {
  @Description('User email.')
  public readonly email: Email;

  @Description('User password.')
  public readonly password: string | HashedPassword;

  @Description('Indicates whether the auth identity is active.')
  public readonly isActive: boolean;

  protected readonly _type = AuthIdentityEntity.name;

  public constructor(props: AuthIdentityEntityPropsInputModel) {
    AuthIdentityEntity.validatePassword(props.password);

    super(AuthIdentityId, props);

    this.email = props.email;
    this.password = props.password;
    this.isActive = props.isActive ?? true;
  }

  public static validatePassword(password: string | HashedPassword): void {
    const isHashedPassword = password instanceof HashedPassword;
    if (isHashedPassword) {
      return;
    }

    const minPasswordLength = 3;
    const maxPasswordLength = 50;

    const hasMinimumLength = password.length > minPasswordLength;
    const hasMaximumLength = password.length < maxPasswordLength;

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength],
      () =>
        new InvalidPasswordError({
          maxLength: maxPasswordLength,
          minLength: minPasswordLength,
        }),
    );
  }
}
