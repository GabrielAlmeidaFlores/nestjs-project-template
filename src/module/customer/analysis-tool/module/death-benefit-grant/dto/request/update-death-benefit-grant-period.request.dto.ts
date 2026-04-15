import { DeathBenefitGrantPeriodItemWithDocumentsRequestDto } from '@module/customer/analysis-tool/module/death-benefit-grant/dto/request/create-death-benefit-grant-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitGrantPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitGrantPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DeathBenefitGrantPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitGrantPeriodRequestDto.name;
}
