import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import { InvalidPasswordError } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/error/invalid-customer-name.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { AuthIdentityEntityPropsInterface } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity.props.interface';

export class AuthIdentityEntity extends BaseEntity<AuthIdentityId> {
  @Description('E-mail do cliente.')
  public readonly email: Email;

  @Description('Documento federal do cliente.')
  public readonly federalDocument: FederalDocument;

  @Description('Senha do cliente.')
  public readonly password: string | HashedPassword;

  @Description('Segredo do aplicativo autenticador do cliente.')
  public readonly authenticatorAppSecret: string | null;

  @Description('Cliente associado à identidade de autenticação.')
  public readonly customer: CustomerId | null;

  @Description('Administrador associado à identidade de autenticação.')
  public readonly admin: AdminId | null;

  @Description('Indica se a identidade de autenticação está ativa.')
  public readonly isActive: boolean;

  protected readonly _type = AuthIdentityEntity.name;

  public constructor(props: AuthIdentityEntityPropsInterface) {
    AuthIdentityEntity.validatePassword(props.password);

    super(AuthIdentityId, props);

    this.email = props.email;
    this.federalDocument = props.federalDocument;
    this.password = props.password;
    this.authenticatorAppSecret = props.authenticatorAppSecret ?? null;
    this.customer = props.customer ?? null;
    this.admin = props.admin ?? null;
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
