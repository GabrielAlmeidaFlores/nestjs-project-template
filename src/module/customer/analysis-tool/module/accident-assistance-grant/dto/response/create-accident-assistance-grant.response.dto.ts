import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentAssistanceGrantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceGrantId)
  public accidentAssistanceGrantId: AccidentAssistanceGrantId;

  protected override readonly _type =
    CreateAccidentAssistanceGrantResponseDto.name;
}
