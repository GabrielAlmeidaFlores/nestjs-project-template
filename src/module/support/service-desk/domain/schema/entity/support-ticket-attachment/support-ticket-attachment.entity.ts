import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SupportTicketAttachmentId } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketAttachmentEntityPropsInterface } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity.props.interface';

export class SupportTicketAttachmentEntity extends BaseEntity<SupportTicketAttachmentId> {
  public readonly supportTicketId: SupportTicketId;
  public readonly fileName: string;

  protected readonly _type = SupportTicketAttachmentEntity.name;

  public constructor(props: SupportTicketAttachmentEntityPropsInterface) {
    super(SupportTicketAttachmentId, props);

    this.supportTicketId = props.supportTicketId;
    this.fileName = props.fileName;
  }
}
