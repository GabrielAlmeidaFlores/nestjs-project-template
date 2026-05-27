import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';

@ResponseDto()
export class CreateCommentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CommentId)
  public commentId: CommentId;

  protected override readonly _type = CreateCommentResponseDto.name;
}
