import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateUserRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public bio?: string;

  protected override readonly _type = UpdateUserRequestDto.name;
}
