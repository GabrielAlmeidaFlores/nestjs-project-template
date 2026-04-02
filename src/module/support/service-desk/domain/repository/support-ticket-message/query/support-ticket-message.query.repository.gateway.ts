import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ListSupportTicketMessagesQueryParam } from '@module/support/service-desk/domain/repository/support-ticket-message/query/param/list-support-ticket-messages.query.param';
import type { GetSupportTicketMessageQueryResult } from '@module/support/service-desk/domain/repository/support-ticket-message/query/result/get-support-ticket-message.query.result';

export abstract class SupportTicketMessageQueryRepositoryGateway {
  public abstract listPaginatedBySupportTicketId(
    param: ListSupportTicketMessagesQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketMessageQueryResult>>;
}
