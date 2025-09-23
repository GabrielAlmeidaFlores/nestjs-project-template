import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class ListDataRequestDto extends BaseBuildableObject {
  @RequestDtoNumberProperty({ example: 1 })
  public page: number;

  @RequestDtoNumberProperty({ example: 10 })
  public limit: number;

  @RequestDtoStringProperty({ required: false, example: '-createdAt' })
  public sortField?: string;

  @RequestDtoStringProperty({ required: false })
  public field?: string;

  @RequestDtoStringProperty({ required: false })
  public search?: string;

  protected override readonly _type = ListDataRequestDto.name;
}
