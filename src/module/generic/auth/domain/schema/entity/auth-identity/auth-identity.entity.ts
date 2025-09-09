import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidPasswordError } from '@module/generic/auth/domain/schema/entity/auth-identity/error/invalid-customer-name.error';
import { AuthIdentityId } from '@module/generic/auth/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { AuthIdentityEntityPropsInterface } from '@module/generic/auth/domain/schema/entity/auth-identity/auth-identity.entity.props.interface';

export class AuthIdentityEntity extends BaseEntity<AuthIdentityId> {
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly password: HashedPassword;
  public readonly customer: CustomerId | null;

  protected readonly _type = AuthIdentityEntity.name;

  public constructor(props: AuthIdentityEntityPropsInterface) {
    AuthIdentityEntity.validatePassword(props.password);

    super(AuthIdentityId, props);

    this.email = props.email;
    this.federalDocument = props.federalDocument;
    this.password = props.password;
    this.customer = props.customer ?? null;
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
