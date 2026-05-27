import { BaseEntityPropsInputModel } from '@core/domain/schema/entity/base/base.entity.props.input.model';

import type { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class CommentEntityPropsInputModel extends BaseEntityPropsInputModel<CommentId> {
  public postId: PostId;
  public authorId: UserId;
  public content: string;
  protected override readonly _type = CommentEntityPropsInputModel.name;
}
