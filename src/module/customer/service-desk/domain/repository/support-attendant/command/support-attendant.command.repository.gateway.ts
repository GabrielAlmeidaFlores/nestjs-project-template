import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantEntity } from '@module/customer/service-desk/domain/schema/entity/support-attendant/support-attendant.entity';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export abstract class SupportAttendantCommandRepositoryGateway {
  public abstract createSupportAttendant(
    entity: SupportAttendantEntity,
  ): TransactionType;

  public abstract updateSupportAttendant(
    id: SupportAttendantId,
    name: string,
    email: string,
    supportType: SupportTypeEnum,
  ): TransactionType;

  public abstract updateSupportAttendantStatus(
    id: SupportAttendantId,
    isActive: boolean,
  ): TransactionType;

  public abstract updateSupportAttendantAndAuthIdentityIsActive(
    id: SupportAttendantId,
    isActive: boolean,
  ): TransactionType;
}
