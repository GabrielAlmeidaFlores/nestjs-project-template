import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { CreateTemporaryDisabilityBenefitsGrantPeriodItemRequestDto } from './create-temporary-disability-benefits-grant-period.request.dto';

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
