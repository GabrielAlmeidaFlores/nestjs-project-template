import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { HashedPassword } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/hashed-password/hashed-password.value-object';

export class GetAuthIdentityWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: AuthIdentityId;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly password: HashedPassword;
  public readonly authenticatorAppSecret: string | null;
  public readonly isActive: boolean;
  public readonly customer: GetCustomerQueryResult | null;
  public readonly admin: GetAdminQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetAuthIdentityWithRelationsQueryResult.name;
}
