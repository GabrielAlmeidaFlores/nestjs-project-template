import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentAssistanceTerminatedResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceTerminatedId)
  public accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId;

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedResponseDto.name;
}
