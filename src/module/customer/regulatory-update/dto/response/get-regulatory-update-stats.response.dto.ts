import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRegulatoryUpdateStatsResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public totalUpdates: number;

  @ResponseDtoNumberProperty()
  public totalMonitoredSources: number;

  @ResponseDtoDateProperty({ required: false })
  public lastVerifiedAt?: Date;

  protected override readonly _type = GetRegulatoryUpdateStatsResponseDto.name;
}
