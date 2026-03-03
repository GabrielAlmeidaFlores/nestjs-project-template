import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateRetirementPlanningRppsRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RetirementPlanningRppsId)
  public readonly retirementPlanningRppsId: RetirementPlanningRppsId;

  protected override readonly _type =
    UpdateRetirementPlanningRppsRemunerationResponseDto.name;
}
