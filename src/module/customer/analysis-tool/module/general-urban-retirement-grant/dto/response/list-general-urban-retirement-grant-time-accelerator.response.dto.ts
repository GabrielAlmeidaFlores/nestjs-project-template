import { GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-time-accelerator.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto extends ListDataResponseDto<GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto[];

  @ResponseDtoObjectProperty(() => Object)
  public total: { years: number; months: number; days: number };

  protected override readonly _type =
    ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.name;
}
