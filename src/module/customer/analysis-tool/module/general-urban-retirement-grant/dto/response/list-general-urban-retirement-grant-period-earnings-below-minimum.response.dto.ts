import { GetGeneralUrbanRetirementGrantPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-period-earning.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumResponseDto extends ListDataResponseDto<GetGeneralUrbanRetirementGrantPeriodEarningResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantPeriodEarningResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetGeneralUrbanRetirementGrantPeriodEarningResponseDto[];

  protected override readonly _type =
    ListGeneralUrbanRetirementGrantPeriodEarningsBelowMinimumResponseDto.name;
}
