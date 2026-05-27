import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { PostId } from '@module/client/post/domain/schema/entity/post/value-object/post-id/post-id.value-object';

import type { PostEntityPropsInputModel } from '@module/client/post/domain/schema/entity/post/post.entity.props.input.model';
import type { UserId } from '@module/client/user/domain/schema/entity/user/value-object/user-id/user-id.value-object';

export class PostEntity extends BaseEntity<PostId> {
  public readonly authorId: UserId;
  public readonly content: string;

  protected readonly _type = PostEntity.name;

  public constructor(props: PostEntityPropsInputModel) {
    super(PostId, props);

    this.authorId = props.authorId;
    this.content = props.content;
  }
}
