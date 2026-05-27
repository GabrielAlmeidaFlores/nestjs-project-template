import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreatePostResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PostId)
  public postId: PostId;

  protected override readonly _type = CreatePostResponseDto.name;
}
