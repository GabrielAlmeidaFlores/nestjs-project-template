import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import type { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';

export class GetConversationQueryResult extends BaseBuildableObject {
  public readonly id: ConversationId;
  public readonly title?: string | null;
  public readonly assistantType: string | null;
  public readonly status: ConversationStatusTypeEnum | null;
  public readonly lastAIMessageAt: Date | null;
  public readonly archivedAt: Date | null;
  public readonly createdAt: Date;

  protected override readonly _type = GetConversationQueryResult.name;
}
