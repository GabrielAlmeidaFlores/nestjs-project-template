import { CreateTemporaryIncapacityBenefitRejectionWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateTemporaryIncapacityBenefitRejectionWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreateTemporaryIncapacityBenefitRejectionWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdateTemporaryIncapacityBenefitRejectionWorkPeriodsRequestDto.name;
}
