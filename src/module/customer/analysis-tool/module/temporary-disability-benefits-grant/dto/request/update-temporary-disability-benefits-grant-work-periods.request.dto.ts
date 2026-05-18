import { CreateTemporaryDisabilityBenefitsGrantWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsGrantWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateTemporaryDisabilityBenefitsGrantWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto.name;
}
