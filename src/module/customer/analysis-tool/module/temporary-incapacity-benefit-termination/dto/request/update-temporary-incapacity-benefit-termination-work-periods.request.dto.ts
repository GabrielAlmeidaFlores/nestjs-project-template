import { CreateTemporaryIncapacityBenefitTerminationWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/create-temporary-incapacity-benefit-termination-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryIncapacityBenefitTerminationWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateTemporaryIncapacityBenefitTerminationWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsRequestDto.name;
}
