import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateAccidentAssistanceTerminatedPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AccidentAssistanceTerminatedPeriodId)
  public accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId;

  protected override readonly _type =
    CreateAccidentAssistanceTerminatedPeriodResponseDto.name;
}
