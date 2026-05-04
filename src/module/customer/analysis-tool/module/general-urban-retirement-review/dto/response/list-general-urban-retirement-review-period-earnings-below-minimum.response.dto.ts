import { GetGeneralUrbanRetirementReviewPeriodEarningResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-period-earning.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumResponseDto extends ListDataResponseDto<GetGeneralUrbanRetirementReviewPeriodEarningResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewPeriodEarningResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetGeneralUrbanRetirementReviewPeriodEarningResponseDto[];

  protected override readonly _type =
    ListGeneralUrbanRetirementReviewPeriodEarningsBelowMinimumResponseDto.name;
}
