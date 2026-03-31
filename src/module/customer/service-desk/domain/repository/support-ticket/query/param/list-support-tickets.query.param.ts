import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';

export class ListSupportTicketsQueryParam extends ListDataInputModel {
  public readonly status: SupportTicketStatusEnum | null;
  public readonly ticketNumber: string | null;
  public readonly supportType: SupportTypeEnum | null;
  public readonly from: Date | null;
  public readonly to: Date | null;

  protected override readonly _type = ListSupportTicketsQueryParam.name;

  public constructor(props: Partial<ListSupportTicketsQueryParam> = {}) {
    super(props);
    this.status = props.status ?? null;
    this.ticketNumber = props.ticketNumber ?? null;
    this.supportType = props.supportType ?? null;
    this.from = props.from ?? null;
    this.to = props.to ?? null;
  }
}
