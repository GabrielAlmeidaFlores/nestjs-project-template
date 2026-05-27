import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { UserEntity } from '@module/client/user/domain/schema/entity/user/user.entity';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export abstract class UserCommandRepositoryGateway {
  public abstract createUser(entity: UserEntity): TransactionType;

  public abstract updateUser(
    userId: UserId,
    entity: UserEntity,
  ): TransactionType;

  public abstract deleteUser(userId: UserId): TransactionType;
}
