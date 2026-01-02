import { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetConversationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ConversationId)
  public readonly id: ConversationId;

  @ResponseDtoStringProperty({ required: false })
  public readonly assistantType?: string | null;

  @ResponseDtoStringProperty({ required: false })
  public readonly title?: string | null;

  @ResponseDtoEnumProperty(ConversationStatusTypeEnum, { required: false })
  public readonly status?: ConversationStatusTypeEnum | null;

  @ResponseDtoDateProperty({ required: false })
  public readonly lastAIMessageAt?: Date | null;

  @ResponseDtoDateProperty({ required: false })
  public readonly archivedAt?: Date | null;

  @ResponseDtoDateProperty({ required: false })
  public readonly createdAt?: Date | null;

  @ResponseDtoDateProperty({ required: false })
  public readonly updatedAt?: Date | null;

  @ResponseDtoDateProperty({ required: false })
  public readonly deletedAt?: Date | null;

  @ResponseDtoStringProperty({ required: false })
  public readonly contextPrompt?: string | null;

  protected override readonly _type = GetConversationResponseDto.name;
}
