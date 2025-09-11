import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class AuthIdentitySignInResponseDto extends BaseBuildableObject {
  @ResponseDtoEnumProperty(UserLevelEnum)
  public userLevel: UserLevelEnum;

  protected override readonly _type = AuthIdentitySignInResponseDto.name;
}
