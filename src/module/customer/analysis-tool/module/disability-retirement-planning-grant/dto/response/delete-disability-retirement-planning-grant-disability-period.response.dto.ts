import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(DisabilityRetirementPlanningGrantId)
  public disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected override readonly _type =
    DeleteDisabilityRetirementPlanningGrantDisabilityPeriodResponseDto.name;
}
