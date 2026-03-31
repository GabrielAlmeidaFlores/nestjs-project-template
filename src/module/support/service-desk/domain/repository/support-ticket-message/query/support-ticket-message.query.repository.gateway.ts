import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetSupportTicketMessageQueryResult } from '@module/support/service-desk/domain/repository/support-ticket-message/query/result/get-support-ticket-message.query.result';
import type { ListSupportTicketMessagesQueryParamType } from '@module/support/service-desk/domain/repository/support-ticket-message/query/type/input/list-support-ticket-messages.query.param';

export abstract class SupportTicketMessageQueryRepositoryGateway {
  public abstract listPaginatedBySupportTicketId(
    param: ListSupportTicketMessagesQueryParamType,
  ): Promise<ListDataOutputModel<GetSupportTicketMessageQueryResult>>;
}
