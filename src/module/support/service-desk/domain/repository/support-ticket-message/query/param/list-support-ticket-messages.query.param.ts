import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export class ListSupportTicketMessagesQueryParam extends ListDataInputModel {
  public readonly supportTicketId: SupportTicketId;

  protected override readonly _type = ListSupportTicketMessagesQueryParam.name;

  public constructor(
    props: Partial<ListSupportTicketMessagesQueryParam> & {
      supportTicketId: SupportTicketId;
    },
  ) {
    super(props);
    this.supportTicketId = props.supportTicketId;
  }
}
