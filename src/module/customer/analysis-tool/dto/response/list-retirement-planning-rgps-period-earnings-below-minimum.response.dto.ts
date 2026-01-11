import { GetRetirementPlanningRgpsPeriodEarningResponseDto } from '@module/customer/analysis-tool/dto/response/get-retirement-planning-rgps-period-earning.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListRetirementPlanningRgpsPeriodEarningsBelowMinimumResponseDto extends ListDataResponseDto<GetRetirementPlanningRgpsPeriodEarningResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetRetirementPlanningRgpsPeriodEarningResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetRetirementPlanningRgpsPeriodEarningResponseDto[];

  protected override readonly _type =
    ListRetirementPlanningRgpsPeriodEarningsBelowMinimumResponseDto.name;
}
