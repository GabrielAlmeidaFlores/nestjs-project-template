import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export enum ResolveMaternityPayGrantPeriodPendencyActionEnum {
  CONSIDER = 'CONSIDER',
  IGNORE = 'IGNORE',
  PROVISIONAL = 'PROVISIONAL',
  UPDATE_PERIOD_END = 'UPDATE_PERIOD_END',
}

@RequestDto()
export class ResolveMaternityPayGrantPeriodPendencyRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(ResolveMaternityPayGrantPeriodPendencyActionEnum, {
    required: true,
  })
  public action: ResolveMaternityPayGrantPeriodPendencyActionEnum;

  @RequestDtoDateProperty({ required: false })
  public periodEnd?: Date;

  protected override readonly _type =
    ResolveMaternityPayGrantPeriodPendencyRequestDto.name;
}
