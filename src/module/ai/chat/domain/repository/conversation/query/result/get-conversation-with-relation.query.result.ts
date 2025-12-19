import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetConversationToolPolicyQueryResult } from '@module/ai/chat/domain/repository/conversation-tool-policy/query/result/get-conversation-tool-policy.query.result';
import type { ConversationStatusTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import type { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { GetConversationEventResponseDto } from '@module/ai/chat/dto/response/get-conversation-event.response.dto';
import type { GetConversationMessageResponseDto } from '@module/ai/chat/dto/response/get-conversation-message.response.dto';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';

export class GetConversationWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: ConversationId;
  public readonly customer: GetCustomerQueryResult | null;
  public readonly assistantType: string | null;
  public readonly status: ConversationStatusTypeEnum | null;
  public readonly lastAIMessageAt: Date | null;
  public readonly archivedAt: Date | null;
  public readonly conversationMessage:
    | GetConversationMessageResponseDto[]
    | null;
  public readonly conversationEvent: GetConversationEventResponseDto[] | null;
  public readonly conversationToolPolicy: GetConversationToolPolicyQueryResult | null;

  protected override readonly _type =
    GetConversationWithRelationsQueryResult.name;
}
