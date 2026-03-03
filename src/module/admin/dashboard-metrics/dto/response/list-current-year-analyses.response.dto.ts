import { AnalysisItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/analysis-item.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCurrentYearAnalysesResponseDto extends ListDataResponseDto<AnalysisItemResponseDto> {
  @ResponseDtoObjectProperty(() => AnalysisItemResponseDto, {
    isArray: true,
  })
  public override resource: AnalysisItemResponseDto[];

  protected override readonly _type = ListCurrentYearAnalysesResponseDto.name;
}
