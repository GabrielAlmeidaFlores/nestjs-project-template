import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({ required: false })
  public totalCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public totalAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public averageAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public topEightyPercentCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public bottomTwentyPercentCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public topEightyPercentAverageAmount?: number;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisRemunerationCalculationResponseDto.name;
}
