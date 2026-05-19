import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(DecimalValue)
  public remunerationGrossAmount: DecimalValue;

  protected override readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto.name;
}
