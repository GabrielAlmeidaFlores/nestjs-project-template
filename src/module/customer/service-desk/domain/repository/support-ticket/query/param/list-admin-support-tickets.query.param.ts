import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';

export class ListAdminSupportTicketsQueryParam extends ListDataInputModel {
  public readonly status: SupportTicketStatusEnum | null;
  public readonly ticketNumber: string | null;
  public readonly supportType: SupportTypeEnum | null;
  public readonly from: Date | null;
  public readonly to: Date | null;
  public override readonly search: string | null;
  public readonly assignedAttendantId: SupportAttendantId | null;

  protected override readonly _type = ListAdminSupportTicketsQueryParam.name;

  public constructor(props: Partial<ListAdminSupportTicketsQueryParam> = {}) {
    super(props);
    this.status = props.status ?? null;
    this.ticketNumber = props.ticketNumber ?? null;
    this.supportType = props.supportType ?? null;
    this.from = props.from ?? null;
    this.to = props.to ?? null;
    this.search = props.search ?? null;
    this.assignedAttendantId = props.assignedAttendantId ?? null;
  }
}
