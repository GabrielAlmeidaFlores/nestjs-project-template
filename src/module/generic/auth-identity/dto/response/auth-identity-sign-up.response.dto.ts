import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class AuthIdentitySignUpResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(AuthIdentityId)
  public authIdentity: AuthIdentityId;

  protected override readonly _type = AuthIdentitySignUpResponseDto.name;
}
