import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { HashedPassword } from '@module/generic/auth/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

export class GetAuthIdentityQueryResult extends BaseBuildableObject {
  public readonly id: AuthIdentityId;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly password: HashedPassword;
  public readonly customer: CustomerId | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetAuthIdentityQueryResult.name;
}
