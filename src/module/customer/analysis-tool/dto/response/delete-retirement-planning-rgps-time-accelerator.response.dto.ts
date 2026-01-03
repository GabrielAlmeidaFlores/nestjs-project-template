import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRgpsTimeAcceleratorId)
  public retirementPlanningRgpsTimeAcceleratorId: RetirementPlanningRgpsTimeAcceleratorId;

  protected override readonly _type =
    DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto.name;
}
