import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class TotalSubscribersCountResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public totalSubscribers: number;

  protected override readonly _type = TotalSubscribersCountResponseDto.name;
}
