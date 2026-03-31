import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import type { ListSupportTicketsQueryParamType } from '@module/support/service-desk/domain/repository/support-ticket/query/type/input/list-support-tickets.query.param';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export abstract class SupportTicketQueryRepositoryGateway {
  public abstract listPaginated(
    param: ListSupportTicketsQueryParamType,
  ): Promise<ListDataOutputModel<GetSupportTicketQueryResult>>;

  public abstract findOneByIdAndSupportType(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract findOneByIdAndSupportTypeWithAttachments(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null>;
}
