import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket/support-ticket.entity';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export abstract class SupportTicketCommandRepositoryGateway {
  public abstract createSupportTicket(
    entity: SupportTicketEntity,
  ): TransactionType;

  public abstract updateSupportTicketStatus(
    id: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): TransactionType;

  public abstract updateSupportTicketStatusAndAssignedAttendant(
    id: SupportTicketId,
    status: SupportTicketStatusEnum,
    assignedAttendantId: SupportAttendantId,
  ): TransactionType;

  public abstract resolveSupportTicket(
    id: SupportTicketId,
    assignedAttendantId: SupportAttendantId,
  ): TransactionType;

  public abstract unassignTicketsByAttendantId(
    assignedAttendantId: SupportAttendantId,
  ): TransactionType;
}
