import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty()
  public remunerationGrossAmount: number;

  protected override readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRemunerationRequestDto.name;
}
