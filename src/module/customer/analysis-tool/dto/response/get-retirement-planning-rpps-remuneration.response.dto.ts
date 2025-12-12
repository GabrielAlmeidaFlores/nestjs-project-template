import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRppsRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoDateProperty()
  public date: Date;

  @ResponseDtoNumberProperty()
  public amount: number;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationResponseDto.name;
}
