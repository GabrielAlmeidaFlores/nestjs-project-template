import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class SendMessageToConversationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(ConversationId, { required: true })
  public readonly conversationId: ConversationId;

  @RequestDtoValueObjectProperty(CustomerId, { required: true })
  public readonly customerId: CustomerId;

  @RequestDtoStringProperty({ required: true })
  public readonly messge: string;

  protected override readonly _type = SendMessageToConversationRequestDto.name;
}
