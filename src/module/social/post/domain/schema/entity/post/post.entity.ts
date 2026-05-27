import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PostId } from '@module/social/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';
import { UserId } from '@module/social/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

import type { PostEntityPropsInterface } from '@module/social/post/domain/schema/entity/post/post.entity.props.interface';

export class PostEntity extends BaseEntity<PostId> {
  public readonly authorId: UserId;
  public readonly content: string;

  protected readonly _type = PostEntity.name;

  public constructor(props: PostEntityPropsInterface) {
    super(PostId, props);

    this.authorId = props.authorId;
    this.content = props.content;
  }
}
