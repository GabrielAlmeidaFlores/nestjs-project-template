import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import type { ConversationToolPolicyTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/enum/conversation-tool-policy-type.enum';
import type { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

export interface ToolPermissionInterface {
  toolName: string;
  executionMode: ConversationToolPolicyTypeEnum;
  allowSensitiveData: boolean;
}

export interface ConversationToolPolicyEntityPropsInterface
  extends BaseEntityPropsInterface<ConversationToolPolicyId> {
  conversation?: ConversationEntity | null;
  toolsEnable?: boolean | null;
  toolPermission?: ToolPermissionInterface[] | null;
  defaultExecutionMode?: ConversationToolPolicyTypeEnum | null;
  createdAt: Date;
  updatedAt: Date;
}
