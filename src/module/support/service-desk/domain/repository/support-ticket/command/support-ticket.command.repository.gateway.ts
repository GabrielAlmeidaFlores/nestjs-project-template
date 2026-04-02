import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketEntity } from '@module/support/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export abstract class SupportTicketCommandRepositoryGateway {
  public abstract createTransaction(
    supportTicket: SupportTicketEntity,
  ): TransactionType;

  public abstract create(
    supportTicket: SupportTicketEntity,
  ): Promise<GetSupportTicketQueryResult>;

  public abstract updateStatusByIdTransaction(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): TransactionType;

  public abstract updateStatusById(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract assignAttendantByIdTransaction(
    supportTicketId: SupportTicketId,
    attendantId: SupportAttendantId,
  ): TransactionType;
}
