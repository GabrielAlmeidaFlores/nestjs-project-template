import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetTeacherRetirementPlanningRemunerationCalculationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public totalCompetencies: number;

  @ResponseDtoNumberProperty()
  public totalAmount: number;

  @ResponseDtoNumberProperty()
  public averageAmount: number;

  @ResponseDtoNumberProperty()
  public topEightyPercentCompetencies: number;

  @ResponseDtoNumberProperty()
  public bottomTwentyPercentCompetencies: number;

  @ResponseDtoNumberProperty()
  public topEightyPercentAverageAmount: number;

  protected override readonly _type =
    GetTeacherRetirementPlanningRemunerationCalculationResponseDto.name;
}
