import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRppsRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public remunerationDate: Date;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public remunerationAmount: DecimalValue;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationResponseDto.name;
}
