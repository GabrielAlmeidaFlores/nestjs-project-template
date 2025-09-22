import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class ValidateAuthIdentitySignInResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(AuthIdentityId)
  public authIdentityId: AuthIdentityId;

  @ResponseDtoValueObjectProperty(Guid)
  public sessionId: Guid;

  @ResponseDtoEnumProperty(UserLevelEnum)
  public userLevel: UserLevelEnum;

  protected override readonly _type =
    ValidateAuthIdentitySignInResponseDto.name;
}
