import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

@ResponseDto()
export class UpdateUserResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(UserId)
  public userId: UserId;

  protected override readonly _type = UpdateUserResponseDto.name;
}
