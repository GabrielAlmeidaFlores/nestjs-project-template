import { DeathBenefitRejectionPeriodItemWithDocumentsRequestDto } from '@module/customer/analysis-tool/module/death-benefit-rejection/dto/request/create-death-benefit-rejection-period.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateDeathBenefitRejectionPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DeathBenefitRejectionPeriodItemWithDocumentsRequestDto,
    { isArray: true },
  )
  public periods: DeathBenefitRejectionPeriodItemWithDocumentsRequestDto[];

  protected override readonly _type =
    UpdateDeathBenefitRejectionPeriodRequestDto.name;
}
