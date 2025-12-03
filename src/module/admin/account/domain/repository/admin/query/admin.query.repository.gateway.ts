import type { NotFoundError } from '@core/error/not-found.error';
import type { GetAdminQueryResult } from '@module/admin/account/domain/repository/admin/query/result/get-admin.query.result';
import type { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AdminQueryRepositoryGateway {
  public abstract findOneByAdminId(
    adminId: AdminId,
  ): Promise<GetAdminQueryResult | null>;

  public abstract findOneByAuthIdentityIdOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAdminQueryResult>;
}
