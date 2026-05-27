import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class CommentCreatedEventPayload extends BaseBuildableObject {
  public commentId: CommentId;
  public postId: PostId;
  public authorId: UserId;
  protected override readonly _type = CommentCreatedEventPayload.name;
}
