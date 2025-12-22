import { ConversationMessageRoleTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetConversationMessageResponseDto extends BaseBuildableDtoObject {
  public role?: ConversationMessageRoleTypeEnum | null;
  public content?: string | null;

  protected override readonly _type = GetConversationMessageResponseDto.name;
}
