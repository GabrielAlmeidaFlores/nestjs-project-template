import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListDataRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ example: 1 })
  public page = 1;

  @RequestDtoNumberProperty({ example: 10 })
  public limit = 10;

  @RequestDtoStringProperty({ required: false, example: '-createdAt' })
  public sortField?: string;

  @RequestDtoStringProperty({ required: false })
  public field?: string;

  @RequestDtoStringProperty({ required: false })
  public search?: string;

  protected override readonly _type = ListDataRequestDto.name;
}
