import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

export type CreateSupportTicketMessageCommandParamType = {
  supportTicketId: SupportTicketId;
  senderAuthIdentityId: AuthIdentityId;
  senderName: string;
  content: string;
};
