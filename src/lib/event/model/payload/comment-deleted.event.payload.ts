import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CommentId } from '@module/client/comment/domain/schema/entity/comment/value-object/comment-id/comment-id.value-object';
import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export class CommentDeletedEventPayload extends BaseBuildableObject {
  public commentId: CommentId;
  public postId: PostId;
  protected override readonly _type = CommentDeletedEventPayload.name;
}
