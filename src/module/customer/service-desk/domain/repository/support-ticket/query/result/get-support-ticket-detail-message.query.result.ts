import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';
import type { SupportTicketMessageId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';

export class GetSupportTicketDetailMessageQueryResult extends BaseBuildableObject {
  public readonly id: SupportTicketMessageId;
  public readonly senderName: string;
  public readonly senderType: TicketMessageSenderTypeEnum;
  public readonly content: string;
  public readonly createdAt: Date;

  protected override readonly _type =
    GetSupportTicketDetailMessageQueryResult.name;
}
