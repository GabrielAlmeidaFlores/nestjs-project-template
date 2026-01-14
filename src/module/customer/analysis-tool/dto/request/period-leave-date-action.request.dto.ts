import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export enum PeriodLeaveDateActionEnum {
  CONSIDER_LAST_EARNING = 'CONSIDER_LAST_EARNING',
  IGNORE_PERIOD = 'IGNORE_PERIOD',
  UPDATE_PERIOD = 'UPDATE_PERIOD',
}
@RequestDto()
export class PeriodLeaveDateActionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(PeriodLeaveDateActionEnum, { required: true })
  public action: PeriodLeaveDateActionEnum;

  @RequestDtoDateProperty({ required: false })
  public dataLeave?: Date;

  protected override readonly _type = PeriodLeaveDateActionRequestDto.name;
}
