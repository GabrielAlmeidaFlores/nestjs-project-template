import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteInsuranceQualityAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(InsuranceQualityAnalysisId)
  public insuranceQualityAnalysisId: InsuranceQualityAnalysisId;

  protected override readonly _type =
    DeleteInsuranceQualityAnalysisResponseDto.name;
}
