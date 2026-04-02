import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSupportTicketAttachmentQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-attachment.query.result';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class GetSupportTicketQueryResult extends BaseBuildableObject {
  public readonly id: SupportTicketId;
  public readonly ticketNumber: string;
  public readonly supportType: SupportTypeEnum;
  public readonly requesterName: string;
  public readonly requesterEmail: string;
  public readonly subject: string;
  public readonly problem: string;
  public readonly description: string;
  public readonly status: SupportTicketStatusEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly attachments: GetSupportTicketAttachmentQueryResult[] | null;

  protected override readonly _type = GetSupportTicketQueryResult.name;
}
