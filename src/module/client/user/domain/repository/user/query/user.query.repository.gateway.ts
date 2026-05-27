import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetUserQueryResult } from '@module/client/user/domain/repository/user/query/result/get-user.query.result';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class UserQueryRepositoryGateway {
  public abstract findOneUserById(
    id: UserId,
  ): Promise<GetUserQueryResult | null>;

  public abstract findOneUserByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetUserQueryResult | null>;

  public abstract findOneUserByUsername(
    username: string,
  ): Promise<GetUserQueryResult | null>;

  public abstract listUsers(
    pagination: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetUserQueryResult>>;
}
