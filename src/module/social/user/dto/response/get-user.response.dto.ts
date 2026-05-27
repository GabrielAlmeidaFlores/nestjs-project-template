import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@ResponseDto()
export class GetUserResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(UserId)
  public userId: UserId;

  @ResponseDtoValueObjectProperty(AuthIdentityId)
  public authIdentityId: AuthIdentityId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public username: string;

  @ResponseDtoStringProperty({ required: false })
  public bio?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = GetUserResponseDto.name;
}
