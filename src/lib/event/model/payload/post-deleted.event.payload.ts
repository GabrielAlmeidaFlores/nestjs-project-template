import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export class PostDeletedEventPayload extends BaseBuildableObject {
  public postId: PostId;
  protected override readonly _type = PostDeletedEventPayload.name;
}
