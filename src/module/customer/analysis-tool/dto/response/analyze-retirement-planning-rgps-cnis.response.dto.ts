import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AnalyzeRetirementPlanningRgpsCnisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsAnalysisResultId)
  public retirementPlanningRgpsAnalysisResultId: RetirementPlanningRgpsAnalysisResultId;

  @ResponseDtoStringProperty()
  public result: string;

  protected override readonly _type =
    AnalyzeRetirementPlanningRgpsCnisResponseDto.name;
}
