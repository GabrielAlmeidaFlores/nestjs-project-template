import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AsaasWebhookPaymentEventResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public message: string;

  @ResponseDtoBooleanProperty()
  public processed: boolean;

  @ResponseDtoStringProperty()
  public eventId: string;

  @ResponseDtoStringProperty()
  public eventType: string;

  protected override readonly _type = AsaasWebhookPaymentEventResponseDto.name;
}
