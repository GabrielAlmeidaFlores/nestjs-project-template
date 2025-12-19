import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRppsRemunerationCalculationResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationResponseDto.name;
}
