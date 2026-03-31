import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@ResponseDto()
export class AuthIdentitySignInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(UserLevelEnum)
  public userLevel: UserLevelEnum;

  @ResponseDtoBooleanProperty({ required: false })
  public mustChangePassword?: boolean;

  protected override readonly _type = AuthIdentitySignInResponseDto.name;
}
