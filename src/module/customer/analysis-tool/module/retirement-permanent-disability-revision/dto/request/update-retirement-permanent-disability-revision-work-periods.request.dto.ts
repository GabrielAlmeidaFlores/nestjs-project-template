import { CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/create-retirement-permanent-disability-revision-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateRetirementPermanentDisabilityRevisionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto.name;
}
