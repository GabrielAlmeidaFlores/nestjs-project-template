import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CurrentYearLegalPleadingsCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public totalLegalPleadings: number;

  @ResponseDtoNumberProperty()
  public year: number;

  protected override readonly _type =
    CurrentYearLegalPleadingsCountResponseDto.name;
}
