import { DisabilityRetirementPlanningGrantFirstAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/generic/disability-retirement-planning-grant-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantFirstAnalysisModel,
  )
  public disabilityRetirementPlanningGrantFirstAnalysis: DisabilityRetirementPlanningGrantFirstAnalysisModel;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningGrantFirstAnalysisResponseDto.name;
}
