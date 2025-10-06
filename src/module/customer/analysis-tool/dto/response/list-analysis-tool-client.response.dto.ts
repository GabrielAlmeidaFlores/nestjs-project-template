import { GetAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListAnalysisToolClientResponseDto extends ListDataResponseDto<GetAnalysisToolClientResponseDto> {
  @ResponseDtoObjectProperty(() => GetAnalysisToolClientResponseDto, {
    isArray: true,
  })
  public override resource: GetAnalysisToolClientResponseDto[];

  protected override readonly _type = ListAnalysisToolClientResponseDto.name;
}
