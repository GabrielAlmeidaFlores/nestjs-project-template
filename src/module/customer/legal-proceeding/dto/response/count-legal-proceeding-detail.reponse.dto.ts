import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CountLegalProceedingDetailResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public readonly inProgress: number;

  @ResponseDtoNumberProperty()
  public readonly completed: number;

  @ResponseDtoNumberProperty()
  public readonly total: number;

  protected override readonly _type =
    CountLegalProceedingDetailResponseDto.name;
}
