import { CreateSpecialRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialRetirementGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateSpecialRetirementGrantPeriodRequestDto,
    {
      isArray: true,
    },
  )
  public periods: CreateSpecialRetirementGrantPeriodRequestDto[];

  protected override readonly _type =
    UpdateSpecialRetirementGrantPeriodRequestDto.name;
}
