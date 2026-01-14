import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';
import { GetAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/legal-proceeding/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetLegalProceedingDetailWithRelationsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(LegalProceedingDetailId)
  public readonly id: LegalProceedingDetailId;

  @ResponseDtoObjectProperty(() => Object)
  public readonly detail: object;

  @ResponseDtoObjectProperty(
    () => GetAnalysisToolClientLegalProceedingResponseDto,
  )
  public readonly analysisToolClientLegalProceeding: GetAnalysisToolClientLegalProceedingResponseDto;

  protected override readonly _type =
    GetLegalProceedingDetailWithRelationsResponseDto.name;
}
