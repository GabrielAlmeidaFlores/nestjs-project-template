import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export type ListSupportTicketMessagesQueryParamType = {
  page: number;
  limit: number;
  supportTicketId: SupportTicketId;
};
