import { GetAnalysisToolClientLegalProceedingClientDetailResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { GetLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAnalysisToolClientLegalProceedingDetailResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public legalProceedingNumber: string;

  @ResponseDtoObjectProperty(
    () => GetAnalysisToolClientLegalProceedingClientDetailResponseDto,
  )
  public analysisToolClient: GetAnalysisToolClientLegalProceedingClientDetailResponseDto;

  @ResponseDtoObjectProperty(() => GetLegalProceedingDetailResponseDto)
  public legalProceedingDetail: GetLegalProceedingDetailResponseDto[];

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingDetailResponseDto.name;
}
