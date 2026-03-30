import { DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDisabilityRetirementPlanningGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DisabilityRetirementPlanningGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningGrantPeriodRequestDto.name;
}
