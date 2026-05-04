import { GetGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/get-general-urban-retirement-review-time-accelerator.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListGeneralUrbanRetirementReviewTimeAcceleratorResponseDto extends ListDataResponseDto<GetGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementReviewTimeAcceleratorResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetGeneralUrbanRetirementReviewTimeAcceleratorResponseDto[];

  @ResponseDtoObjectProperty(() => Object)
  public total: { years: number; months: number; days: number };

  protected override readonly _type =
    ListGeneralUrbanRetirementReviewTimeAcceleratorResponseDto.name;
}
