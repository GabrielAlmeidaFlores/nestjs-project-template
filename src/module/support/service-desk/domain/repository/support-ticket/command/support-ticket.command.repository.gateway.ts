import type { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export abstract class SupportTicketCommandRepositoryGateway {
  public abstract updateStatusById(
    supportTicketId: SupportTicketId,
    status: SupportTicketStatusEnum,
  ): Promise<GetSupportTicketQueryResult | null>;
}
