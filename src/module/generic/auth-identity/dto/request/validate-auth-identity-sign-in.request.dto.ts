import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class ValidateAuthIdentitySignInRequestDto extends BaseBuildableObject {
  @RequestDtoStringProperty()
  public jwt: string;

  protected override readonly _type = ValidateAuthIdentitySignInRequestDto.name;
}
