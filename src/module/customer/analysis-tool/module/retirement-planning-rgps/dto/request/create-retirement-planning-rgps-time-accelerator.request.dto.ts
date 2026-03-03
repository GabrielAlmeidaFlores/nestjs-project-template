import { RetirementPlanningRgpsAnalysisResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/value-object/retirement-planning-rgps-analysis-result-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataCreateRetirementPlanningRgpsTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(RetirementPlanningRgpsAnalysisResultId)
  public retirementPlanningRgpsAnalysisResultId: RetirementPlanningRgpsAnalysisResultId;

  protected override readonly _type =
    DataCreateRetirementPlanningRgpsTimeAcceleratorRequestDto.name;
}

@RequestDto()
export class CreateRetirementPlanningRgpsTimeAcceleratorRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataCreateRetirementPlanningRgpsTimeAcceleratorRequestDto,
  )
  public json: DataCreateRetirementPlanningRgpsTimeAcceleratorRequestDto;

  protected override readonly _type =
    CreateRetirementPlanningRgpsTimeAcceleratorRequestDto.name;
}
