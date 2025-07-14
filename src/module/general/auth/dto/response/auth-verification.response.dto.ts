import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class AuthVerificationResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(Guid)
  public userId: Guid;

  @ResponseDtoEnumProperty(UserLevelEnum)
  public userLevel: UserLevelEnum;

  protected override readonly _type = AuthVerificationResponseDto.name;
}
