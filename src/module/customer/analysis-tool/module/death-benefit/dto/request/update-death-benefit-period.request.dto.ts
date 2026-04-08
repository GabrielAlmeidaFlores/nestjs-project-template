import { DeathBenefitPeriodItemWithDocumentsRequestDto } from '@module/customer/analysis-tool/module/death-benefit/dto/request/create-death-benefit-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DeathBenefitPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitPeriodRequestDto.name;
}
