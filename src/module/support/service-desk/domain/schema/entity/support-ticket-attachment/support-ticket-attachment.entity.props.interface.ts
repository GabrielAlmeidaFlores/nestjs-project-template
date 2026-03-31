import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketAttachmentId } from '@module/support/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

export interface SupportTicketAttachmentEntityPropsInterface extends BaseEntityPropsInterface<SupportTicketAttachmentId> {
  supportTicketId: SupportTicketId;
  bucketKey: string;
  originalFileName: string;
}
