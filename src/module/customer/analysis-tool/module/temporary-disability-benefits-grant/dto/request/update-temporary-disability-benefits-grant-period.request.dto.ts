import { CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/create-temporary-disability-benefits-grant-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto,
    { isArray: true },
  )
  public periods: CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantPeriodRequestDto.name;
}
