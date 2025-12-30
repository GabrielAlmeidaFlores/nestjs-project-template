import { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetLegalProceedingDetailLawyerWithRelationsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(LegalProceedingDetailId)
  public readonly id: LegalProceedingDetailId;

  @ResponseDtoObjectProperty(() => Object)
  public readonly detail: object;

  @ResponseDtoObjectProperty(
    () => GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
  )
  public readonly analysisToolClientLegalProceeding: GetAnalysisToolClientLegalProceedingWithRelationsQueryResult;

  @ResponseDtoObjectProperty(() => Object)
  public readonly recipient: object;

  @ResponseDtoObjectProperty(() => Object)
  public readonly recipientLawyer: object;

  protected override readonly _type =
    GetLegalProceedingDetailLawyerWithRelationsResponseDto.name;
}
