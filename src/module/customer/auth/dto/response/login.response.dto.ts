import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class LoginResponseDto extends BaseBuildableObject {
  @ResponseDtoBooleanProperty()
  public authenticated: boolean;

  protected override readonly _type = LoginResponseDto.name;
}
