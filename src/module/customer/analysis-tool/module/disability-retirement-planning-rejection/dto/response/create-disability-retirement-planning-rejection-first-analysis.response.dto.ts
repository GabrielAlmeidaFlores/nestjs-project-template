import { DisabilityRetirementPlanningRejectionFirstAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/model/generic/disability-retirement-planning-rejection-first-analysis.model';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => DisabilityRetirementPlanningRejectionFirstAnalysisModel,
  )
  public disabilityRetirementPlanningRejectionFirstAnalysis: DisabilityRetirementPlanningRejectionFirstAnalysisModel;

  protected override readonly _type =
    CreateDisabilityRetirementPlanningRejectionFirstAnalysisResponseDto.name;
}
