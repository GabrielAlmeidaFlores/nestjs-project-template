import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportAttendantEntity } from '@module/support/account/domain/schema/entity/support-attendant/support-attendant.entity';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export abstract class SupportAttendantCommandRepositoryGateway {
  public abstract createSupportAttendant(
    props: SupportAttendantEntity,
  ): TransactionType;

  public abstract updateSupportAttendant(
    id: SupportAttendantId,
    props: SupportAttendantEntity,
  ): TransactionType;
}
