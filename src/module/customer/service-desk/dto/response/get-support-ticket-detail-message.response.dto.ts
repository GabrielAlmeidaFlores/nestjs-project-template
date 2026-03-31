import { TicketMessageSenderTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/enum/ticket-message-sender-type.enum';
import { SupportTicketMessageId } from '@module/customer/service-desk/domain/schema/entity/support-ticket-message/value-object/support-ticket-message-id/support-ticket-message-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSupportTicketDetailMessageResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportTicketMessageId)
  public supportTicketMessageId: SupportTicketMessageId;

  @ResponseDtoStringProperty()
  public senderName: string;

  @ResponseDtoEnumProperty(TicketMessageSenderTypeEnum)
  public senderType: TicketMessageSenderTypeEnum;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type =
    GetSupportTicketDetailMessageResponseDto.name;
}
