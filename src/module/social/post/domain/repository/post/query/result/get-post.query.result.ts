import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';
import type { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

export class GetPostQueryResult extends BaseBuildableObject {
  public readonly id: PostId;
  public readonly authorId: UserId;
  public readonly content: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetPostQueryResult.name;
}
