import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateRetirementPlanningRgpsResultResponseDto extends BaseBuildableDtoObject {
  public success: boolean;

  protected override readonly _type =
    CreateRetirementPlanningRgpsResultResponseDto.name;

  public constructor(success: boolean) {
    super();
    this.success = success;
  }
}
