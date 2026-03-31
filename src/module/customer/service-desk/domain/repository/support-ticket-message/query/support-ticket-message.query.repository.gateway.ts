import type { GetSupportTicketDetailMessageQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-message.query.result';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export abstract class SupportTicketMessageQueryRepositoryGateway {
  public abstract listSupportTicketMessagesByTicketId(
    ticketId: SupportTicketId,
  ): Promise<GetSupportTicketDetailMessageQueryResult[]>;
}
