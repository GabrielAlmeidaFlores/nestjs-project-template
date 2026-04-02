import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class ListSupportTicketsQueryParam extends ListDataInputModel {
  public readonly supportType: SupportTypeEnum | null;
  public readonly status: SupportTicketStatusEnum | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly assignedAttendantId: SupportAttendantId | null;

  protected override readonly _type = ListSupportTicketsQueryParam.name;

  public constructor(props: Partial<ListSupportTicketsQueryParam> = {}) {
    super(props);
    this.supportType = props.supportType ?? null;
    this.status = props.status ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.assignedAttendantId = props.assignedAttendantId ?? null;
  }
}
