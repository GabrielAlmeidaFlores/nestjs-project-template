import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CommentId } from '@module/social/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

import type { CommentEntityPropsInterface } from '@module/social/comment/domain/schema/entity/comment/comment.entity.props.interface';

export class CommentEntity extends BaseEntity<CommentId> {
  public readonly postId: PostId;
  public readonly authorId: UserId;
  public readonly content: string;

  protected readonly _type = CommentEntity.name;

  public constructor(props: CommentEntityPropsInterface) {
    super(CommentId, props);

    this.postId = props.postId;
    this.authorId = props.authorId;
    this.content = props.content;
  }
}
