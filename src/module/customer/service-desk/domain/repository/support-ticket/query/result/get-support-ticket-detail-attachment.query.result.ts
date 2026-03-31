import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SupportTicketAttachmentId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

export class GetSupportTicketDetailAttachmentQueryResult extends BaseBuildableObject {
  public readonly id: SupportTicketAttachmentId;
  public readonly originalFileName: string;
  public readonly bucketKey: string;

  protected override readonly _type =
    GetSupportTicketDetailAttachmentQueryResult.name;
}
