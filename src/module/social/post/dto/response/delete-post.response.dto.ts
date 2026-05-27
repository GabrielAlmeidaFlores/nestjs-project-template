import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

@ResponseDto()
export class DeletePostResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PostId)
  public postId: PostId;

  protected override readonly _type = DeletePostResponseDto.name;
}
