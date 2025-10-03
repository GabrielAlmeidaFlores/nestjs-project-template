import { GetCnisFastAnalysisResponseDto } from '@module/customer/analysis-tools/dto/response/get-cnis-fast-analysis.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListCnisFastAnalysisResponseDto extends ListDataResponseDto<GetCnisFastAnalysisResponseDto> {
  @ResponseDtoObjectProperty(() => GetCnisFastAnalysisResponseDto, {
    isArray: true,
  })
  public override resource: GetCnisFastAnalysisResponseDto[];

  protected override readonly _type = ListCnisFastAnalysisResponseDto.name;
}
