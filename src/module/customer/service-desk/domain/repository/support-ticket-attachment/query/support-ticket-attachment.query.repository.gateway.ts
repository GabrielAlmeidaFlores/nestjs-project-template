import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketAttachmentEntity } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/support-ticket-attachment.entity';
import type { SupportTicketAttachmentId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-attachment/value-object/support-ticket-attachment-id/support-ticket-attachment-id.value-object';

export abstract class SupportTicketAttachmentQueryRepositoryGateway {
  public abstract findOneSupportTicketAttachmentById(
    id: SupportTicketAttachmentId,
  ): Promise<SupportTicketAttachmentEntity | null>;

  public abstract listSupportTicketAttachmentsByTicketId(
    ticketId: SupportTicketId,
  ): Promise<SupportTicketAttachmentEntity[]>;
}
