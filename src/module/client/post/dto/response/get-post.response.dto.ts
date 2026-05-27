import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPostResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PostId)
  public postId: PostId;

  @ResponseDtoValueObjectProperty(UserId)
  public authorId: UserId;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = GetPostResponseDto.name;
}
