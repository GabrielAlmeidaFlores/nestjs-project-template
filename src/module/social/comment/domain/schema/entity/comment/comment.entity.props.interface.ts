import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import type { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';

export interface CommentEntityPropsInterface
  extends BaseEntityPropsInterface<CommentId> {
  postId: PostId;
  authorId: UserId;
  content: string;
}
