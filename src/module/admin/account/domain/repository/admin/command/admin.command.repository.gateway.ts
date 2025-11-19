import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AdminEntity } from '@module/admin/account/domain/schema/entity/admin/admin.entity';
import type { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';

export abstract class AdminCommandRepositoryGateway {
  public abstract createAdmin(props: AdminEntity): TransactionType;
  public abstract updateAdmin(
    adminId: AdminId,
    props: AdminEntity,
  ): TransactionType;
}
