import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRetirementPlanningRppsRemunerationCalculationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty({ required: false })
  public totalCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public totalAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public totalUpdatedAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public averageAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public averageUpdatedAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public topEightyPercentCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public bottomTwentyPercentCompetencies?: number;

  @ResponseDtoNumberProperty({ required: false })
  public topEightyPercentAverageAmount?: number;

  @ResponseDtoNumberProperty({ required: false })
  public topEightyPercentAverageUpdatedAmount?: number;

  @ResponseDtoDateProperty({ required: false })
  public createdAt?: Date;

  @ResponseDtoDateProperty({ required: false })
  public updatedAt?: Date;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationResponseDto.name;
}
