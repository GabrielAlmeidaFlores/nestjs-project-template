import { CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto.name;
}
