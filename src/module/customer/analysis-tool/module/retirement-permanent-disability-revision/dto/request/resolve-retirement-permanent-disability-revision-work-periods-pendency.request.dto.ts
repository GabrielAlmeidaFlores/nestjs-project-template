import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export enum ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum {
  CONSIDER = 'CONSIDER',
  IGNORE = 'IGNORE',
  PROVISIONAL = 'PROVISIONAL',
  UPDATE_PERIOD_END = 'UPDATE_PERIOD_END',
}

@RequestDto()
export class ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(
    ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum,
    { required: true },
  )
  public action: ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum;

  @RequestDtoDateProperty({ required: false })
  public periodEnd?: Date;

  protected override readonly _type =
    ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto.name;
}
