import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateInsuranceQualityAnalysisResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(InsuranceQualityAnalysisResultId)
  public insuranceQualityAnalysisResultId: InsuranceQualityAnalysisResultId;

  protected override readonly _type =
    CreateInsuranceQualityAnalysisResultResponseDto.name;
}
