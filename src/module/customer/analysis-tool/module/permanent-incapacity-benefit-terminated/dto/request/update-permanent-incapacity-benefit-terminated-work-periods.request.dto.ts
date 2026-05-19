import { CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-work-periods.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto,
    { isArray: true },
  )
  public workPeriods: CreatePermanentIncapacityBenefitTerminatedWorkPeriodsItemRequestDto[];

  protected override readonly _type =
    UpdatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto.name;
}
