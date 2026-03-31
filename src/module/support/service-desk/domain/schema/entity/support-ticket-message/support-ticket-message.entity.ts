import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SupportTicketMessageId } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';

import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketMessageEntityPropsInterface } from '@module/support/service-desk/domain/schema/entity/support-ticket-message/support-ticket-message.entity.props.interface';

export class SupportTicketMessageEntity extends BaseEntity<SupportTicketMessageId> {
  public readonly supportTicketId: SupportTicketId;
  public readonly senderAuthIdentityId: AuthIdentityId;
  public readonly senderName: string;
  public readonly senderType: string;
  public readonly content: string;

  protected readonly _type = SupportTicketMessageEntity.name;

  public constructor(props: SupportTicketMessageEntityPropsInterface) {
    super(SupportTicketMessageId, props);

    this.supportTicketId = props.supportTicketId;
    this.senderAuthIdentityId = props.senderAuthIdentityId;
    this.senderName = props.senderName;
    this.senderType = props.senderType;
    this.content = props.content;
  }
}
