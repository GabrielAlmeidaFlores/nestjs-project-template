import { GetAnalysisToolClientLegalProceedingWithRelationsResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding-with-relations.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';

@ResponseDto()
export class ListAnalysisToolClientLegalProceedingResponseDto extends ListDataResponseDto<GetAnalysisToolClientLegalProceedingWithRelationsResponseDto> {
  @ResponseDtoObjectProperty(
    () => GetAnalysisToolClientLegalProceedingWithRelationsResponseDto,
    {
      isArray: true,
    },
  )
  public override resource: GetAnalysisToolClientLegalProceedingWithRelationsResponseDto[];

  protected override readonly _type =
    ListAnalysisToolClientLegalProceedingResponseDto.name;
}
