import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { MessageRoleEnum } from '@module/generic/ai-conversation/lib/mcp-tools/enum/message-role.enum';

export class MessageModel extends BaseBuildableObject {
  public id: Guid;
  public conversationId: Guid;
  public role: MessageRoleEnum;
  public content: string;
  public timestamp: Date;

  protected override readonly _type = MessageModel.name;
}
