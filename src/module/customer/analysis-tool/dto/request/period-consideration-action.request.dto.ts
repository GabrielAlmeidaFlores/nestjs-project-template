import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export enum PeriodConsiderationActionEnum {
  CONSIDER = 'CONSIDER',
  IGNORE = 'IGNORE',
  PROVISIONAL = 'PROVISIONAL',
}

@RequestDto()
export class PeriodConsiderationActionRequestDto extends BaseBuildableDtoObject {
  @RequestDtoEnumProperty(PeriodConsiderationActionEnum, { required: true })
  public action: PeriodConsiderationActionEnum;

  protected override readonly _type = PeriodConsiderationActionRequestDto.name;
}
