import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';

import type { CommentEntityPropsInputModel } from '@module/client/comment/domain/schema/entity/comment/comment.entity.props.input.model';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class CommentEntity extends BaseEntity<CommentId> {
  public readonly postId: PostId;
  public readonly authorId: UserId;
  public readonly content: string;

  protected readonly _type = CommentEntity.name;

  public constructor(props: CommentEntityPropsInputModel) {
    super(CommentId, props);

    this.postId = props.postId;
    this.authorId = props.authorId;
    this.content = props.content;
  }
}
