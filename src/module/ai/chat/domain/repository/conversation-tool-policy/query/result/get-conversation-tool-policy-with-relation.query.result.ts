import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ToolPermissionInterface } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity.props.interface';
import { ConversationToolPolicyTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/enum/conversation-tool-policy-type.enum';
import { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetConversationToolPolicyWithRelationsQueryResult extends BaseBuildableDtoObject {
  public id: ConversationToolPolicyId;
  public conversation: ConversationEntity;
  public toolsEnable?: boolean | null;
  public toolPermission?: ToolPermissionInterface[] | null;
  public defaultExecutionMode?: ConversationToolPolicyTypeEnum | null;
  public createdAt: Date;
  public updatedAt: Date;

  protected override readonly _type =
    GetConversationToolPolicyWithRelationsQueryResult.name;
}
