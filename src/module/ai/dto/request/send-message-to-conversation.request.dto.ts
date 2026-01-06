import { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { MimeTypeEnum } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/enum/mime-type.enum';
import { RequestDtoFileProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-file-property/request-dto-file-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { FileModel } from '@shared/system/model/generic/file.model';

@RequestDto()
export class DataSendMessageToConversationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(ConversationId, { required: true })
  public readonly conversationId: ConversationId;

  @RequestDtoValueObjectProperty(CustomerId, { required: true })
  public readonly customerId: CustomerId;

  @RequestDtoStringProperty({ required: true })
  public readonly message: string;

  @RequestDtoStringProperty({ required: false })
  public readonly title?: string;

  protected override readonly _type =
    DataSendMessageToConversationRequestDto.name;
}

@RequestDto()
export class SendMessageToConversationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(() => DataSendMessageToConversationRequestDto)
  public json: DataSendMessageToConversationRequestDto;

  @RequestDtoFileProperty({
    allowedMimeType: [MimeTypeEnum.APPLICATION_PDF, MimeTypeEnum.WORD],
    required: false,
    isArray: true,
  })
  public files?: FileModel[];

  protected override readonly _type = SendMessageToConversationRequestDto.name;
}
