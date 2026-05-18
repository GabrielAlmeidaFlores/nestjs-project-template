import { GetGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListGeneralUrbanRetirementAnalysisRemunerationResponseDto extends ListDataResponseDto<GetGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetGeneralUrbanRetirementAnalysisRemunerationResponseDto,
    { isArray: true },
  )
  public override resource: GetGeneralUrbanRetirementAnalysisRemunerationResponseDto[];

  protected override readonly _type =
    ListGeneralUrbanRetirementAnalysisRemunerationResponseDto.name;
}
