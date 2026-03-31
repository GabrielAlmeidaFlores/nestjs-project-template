import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';
import type { SupportTicketMessageId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export interface SupportTicketMessageEntityPropsInterface extends BaseEntityPropsInterface<SupportTicketMessageId> {
  supportTicketId: SupportTicketId;
  senderAuthIdentityId: AuthIdentityId;
  senderName: string;
  senderType: TicketMessageSenderTypeEnum;
  content: string;
}
