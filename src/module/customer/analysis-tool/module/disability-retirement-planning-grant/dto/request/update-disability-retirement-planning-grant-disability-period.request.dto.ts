import { DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/dto/request/create-disability-retirement-planning-grant-disability-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () =>
      DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public disabilityPeriods: DisabilityRetirementPlanningGrantDisabilityPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateDisabilityRetirementPlanningGrantDisabilityPeriodRequestDto.name;
}
