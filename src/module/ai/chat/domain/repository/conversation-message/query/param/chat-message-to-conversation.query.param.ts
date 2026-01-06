import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export class ChatMessageToConversationQueryParam extends ListDataInputModel {
  public conversationId: ConversationId;
  public customerId: CustomerId;

  protected override readonly _type = ChatMessageToConversationQueryParam.name;

  public constructor(props: Partial<ChatMessageToConversationQueryParam>) {
    super(props);

    const conversationId = props.conversationId;
    const customerId = props.customerId;

    if (conversationId === undefined) {
      throw new Error(
        'ChatMessageToConversationQueryParam.conversationId is required.',
      );
    }

    if (customerId === undefined) {
      throw new Error(
        'ChatMessageToConversationQueryParam.customerId is required.',
      );
    }

    this.conversationId = conversationId;
    this.customerId = customerId;
  }
}
