import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MessageItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  @ResponseDtoEnumProperty(MessageRoleEnum)
  public role: MessageRoleEnum;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public timestamp: Date;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, { required: false })
  public paymentPlanPaidResourceType?: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public context?: string;

  protected override readonly _type = MessageItemResponseDto.name;
}

@ResponseDto()
export class FileItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  @ResponseDtoEnumProperty(MessageRoleEnum)
  public role: MessageRoleEnum;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public timestamp: Date;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, { required: false })
  public paymentPlanPaidResourceType?: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoStringProperty({ required: false })
  public context?: string;

  protected override readonly _type = FileItemResponseDto.name;
}

@ResponseDto()
export class SendMessageResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => MessageItemResponseDto)
  public userMessage: MessageItemResponseDto;

  @ResponseDtoObjectProperty(() => MessageItemResponseDto)
  public assistantMessage: MessageItemResponseDto;

  @ResponseDtoObjectProperty(() => FileItemResponseDto, {
    isArray: true,
    required: false,
  })
  public files?: FileItemResponseDto[];

  protected override readonly _type = SendMessageResponseDto.name;
}
