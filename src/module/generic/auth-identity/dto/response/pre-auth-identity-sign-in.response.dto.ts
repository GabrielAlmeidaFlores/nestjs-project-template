import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@ResponseDto()
export class PreAuthIdentityAuthenticatorDataSignInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public base32: string;

  @ResponseDtoStringProperty()
  public qrCode: string;

  @ResponseDtoStringProperty()
  public otpauth_url: string;

  protected override readonly _type =
    PreAuthIdentityAuthenticatorDataSignInResponseDto.name;
}

@ResponseDto()
export class PreAuthIdentitySignInResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoEnumProperty(UserLevelEnum, { required: false })
  public userLevel?: UserLevelEnum;

  @ResponseDtoObjectProperty(
    () => PreAuthIdentityAuthenticatorDataSignInResponseDto,
    { required: false },
  )
  public authenticatorData?: PreAuthIdentityAuthenticatorDataSignInResponseDto;

  protected override readonly _type = PreAuthIdentitySignInResponseDto.name;
}
