import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRetirementPlanningRppsResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(Object)
  public readonly retirementPlanningRppsCompleteAnalysis: object;

  protected override readonly _type =
    CreateRetirementPlanningRppsResultResponseDto.name;
}
