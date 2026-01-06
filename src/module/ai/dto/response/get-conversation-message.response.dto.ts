import { ConversationMessageRoleTypeEnum } from '@module/ai/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetConversationMessageResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(ConversationMessageRoleTypeEnum, { required: false })
  public role?: ConversationMessageRoleTypeEnum | null;
  @ResponseDtoStringProperty({ required: false })
  public content?: string | null;

  protected override readonly _type = GetConversationMessageResponseDto.name;
}
