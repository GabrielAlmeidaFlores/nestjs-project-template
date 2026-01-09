import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { MessageTypeEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-type.enum';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MessageDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  @ResponseDtoEnumProperty(MessageRoleEnum)
  public role: MessageRoleEnum;

  @ResponseDtoEnumProperty(MessageTypeEnum)
  public type: MessageTypeEnum;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public timestamp: Date;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, { required: false })
  public paymentPlanPaidResourceType?: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public context?: string;

  @ResponseDtoNumberProperty({ required: false })
  public creditCost?: number;

  protected override readonly _type = MessageDto.name;
}

@ResponseDto()
export class GetMessagesResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public conversationId: Guid;

  @ResponseDtoObjectProperty(() => MessageDto, { isArray: true })
  public messages: MessageDto[];

  @ResponseDtoNumberProperty()
  public total: number;

  protected override readonly _type = GetMessagesResponseDto.name;
}
