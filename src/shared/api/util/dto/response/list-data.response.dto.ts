import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class ListDataResponseDto<T> extends BaseBuildableDtoObject {
  @ResponseDtoNumberProperty()
  public page: number;

  @ResponseDtoNumberProperty()
  public limit: number;

  @ResponseDtoNumberProperty()
  public totalItems: number;

  @ResponseDtoNumberProperty()
  public totalPages: number;

  @ResponseDtoNumberProperty()
  public amountItemsCurrentPage: number;

  public resource: T[];

  protected override readonly _type = ListDataResponseDto.name;
}
