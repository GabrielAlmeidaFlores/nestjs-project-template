import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class ListDataResponseDto<T> extends BaseBuildableObject {
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
