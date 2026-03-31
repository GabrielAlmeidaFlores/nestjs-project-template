import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export class GetSupportTicketListItemQueryResult extends BaseBuildableObject {
  public readonly id: SupportTicketId;
  public readonly ticketNumber: string;
  public readonly requesterEmail: string;
  public readonly requesterName: string;
  public readonly subject: string;
  public readonly supportType: SupportTypeEnum;
  public readonly status: SupportTicketStatusEnum;
  public readonly assignedAttendantName: string | null;
  public readonly createdAt: Date;

  protected override readonly _type = GetSupportTicketListItemQueryResult.name;
}
